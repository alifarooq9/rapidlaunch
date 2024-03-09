import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getUser } from "@/server/auth";

/**
 * File router for the application
 * learn more about uploadthing here: @see https://docs.uploadthing.com/getting-started/appdir
 */

const f = createUploadthing();

export const ourFileRouter = {
    profilePicture: f({ image: { maxFileSize: "4MB" } })
        .middleware(async () => {
            const user = await getUser();

            if (!user) throw new UploadThingError("Unauthorized");

            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            return { uploadedBy: metadata.userId, url: file.url };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;


