import "server-only";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { adminProcedure } from "@/server/procedures";
import { asc, count, desc, gt, ilike, inArray, or } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";
import { eachMonthOfInterval, format, startOfMonth, subMonths } from "date-fns";

/**
 * Get paginated users
 * @param page - page number
 * @param per_page - number of items per page
 * @param sort - sort by column
 * @param email - filter by email
 * @param role - filter by role
 * @param operator - filter by operator
 *
 * @returns Paginated users
 */

const panginatedUserPropsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    email: z.string().optional(),
    role: z.string().optional(),
    operator: z.string().optional(),
});

type GetPaginatedUsersQueryProps = z.infer<typeof panginatedUserPropsSchema>;

export async function getPaginatedUsersQuery(
    input: GetPaginatedUsersQueryProps,
) {
    noStore();
    await adminProcedure();

    const offset = (input.page - 1) * input.per_page;

    const [column, order] = (input.sort?.split(".") as [
        keyof typeof users.$inferSelect | undefined,
        "asc" | "desc" | undefined,
    ]) ?? ["title", "desc"];

    const roles =
        (input.role?.split(".") as (typeof users.$inferSelect.role)[]) ?? [];

    const { data, total } = await db.transaction(async (tx) => {
        const data = await tx
            .select()
            .from(users)
            .offset(offset)
            .limit(input.per_page)
            .where(
                or(
                    input.email
                        ? ilike(users.email, `%${input.email}%`)
                        : undefined,

                    roles.length > 0 ? inArray(users.role, roles) : undefined,
                ),
            )
            .orderBy(
                column && column in users
                    ? order === "asc"
                        ? asc(users[column])
                        : desc(users[column])
                    : desc(users.createdAt),
            )
            .execute();

        const total = await tx
            .select({
                count: count(),
            })
            .from(users)
            .where(
                or(
                    input.email
                        ? ilike(users.email, `%${input.email}%`)
                        : undefined,

                    roles.length > 0 ? inArray(users.role, roles) : undefined,
                ),
            )
            .execute()
            .then((res) => res[0]?.count ?? 0);

        return { data, total };
    });

    const pageCount = Math.ceil(total / input.per_page);

    return { data, pageCount, total };
}

export async function getUsersCount() {
    await adminProcedure();

    const dateBeforeMonths = subMonths(new Date(), 6);

    const startDateOfTheMonth = startOfMonth(dateBeforeMonths);

    const { total, data } = await db.transaction(async (tx) => {
        const data = await db.query.users.findMany({
            where: gt(users.createdAt, startDateOfTheMonth),
        });

        const total = await tx
            .select({ count: count() })
            .from(users)
            .execute()
            .then((res) => res[0]?.count ?? 0);

        return { total, data };
    });

    const months = eachMonthOfInterval({
        start: startDateOfTheMonth,
        end: new Date(),
    });

    const usersCountByMonth = months.map((month) => {
        const monthStr = format(month, "MMM-yyy");
        const count = data.filter(
            (user) => format(new Date(user.createdAt), "MMM-yyy") === monthStr,
        ).length;
        return { Date: monthStr, UsersCount: count };
    });

    return {
        usersCountByMonth,
        totalCount: total,
    };
}
