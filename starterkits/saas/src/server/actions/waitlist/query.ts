import { db } from "@/server/db";
import { waitlistUsers } from "@/server/db/schema";
import { adminProcedure } from "@/server/procedures";
import { asc, count, desc, ilike, or } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";

const panginatedWaitlistPropsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    email: z.string().optional(),
    operator: z.string().optional(),
});

type GetPaginatedWaitlistQueryProps = z.infer<
    typeof panginatedWaitlistPropsSchema
>;

export async function getPaginatedWaitlistQuery(
    input: GetPaginatedWaitlistQueryProps,
) {
    noStore();
    await adminProcedure();

    const offset = (input.page - 1) * input.per_page;

    const [column, order] = (input.sort?.split(".") as [
        keyof typeof waitlistUsers.$inferSelect | undefined,
        "asc" | "desc" | undefined,
    ]) ?? ["title", "desc"];

    const { data, total } = await db.transaction(async (tx) => {
        const data = await tx
            .select()
            .from(waitlistUsers)
            .offset(offset)
            .limit(input.per_page)
            .where(
                or(
                    input.email
                        ? ilike(waitlistUsers.email, `%${input.email}%`)
                        : undefined,
                ),
            )
            .orderBy(
                column && column in waitlistUsers
                    ? order === "asc"
                        ? asc(waitlistUsers[column])
                        : desc(waitlistUsers[column])
                    : desc(waitlistUsers.createdAt),
            )
            .execute();

        const total = await tx
            .select({
                count: count(),
            })
            .from(waitlistUsers)
            .where(
                or(
                    input.email
                        ? ilike(waitlistUsers.email, `%${input.email}%`)
                        : undefined,
                ),
            )
            .execute()
            .then((res) => res[0]?.count ?? 0);

        return { data, total };
    });

    const pageCount = Math.ceil(total / input.per_page);

    return { data, pageCount, total };
}

export async function getAllWaitlistUsersQuery() {
    noStore();
    await adminProcedure();

    const data = await db
        .select()
        .from(waitlistUsers)
        .orderBy(desc(waitlistUsers.createdAt))
        .execute();

    return data;
}
