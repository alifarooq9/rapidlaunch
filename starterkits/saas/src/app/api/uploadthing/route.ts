import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "@/server/uploadthing/core";
import { env } from "@/env";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
    router: ourFileRouter,
    config: {
        uploadthingSecret: env.UPLOADTHING_SECRET,
        uploadthingId: env.UPLOADTHING_ID,
    },
});
