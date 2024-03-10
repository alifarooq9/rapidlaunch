import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { siteUrls } from "@/config/urls";
import { getAbsoluteUrl } from "@/lib/utils";

export async function middleware(request: NextRequest) {
    const session = await getToken({ req: request });

    /** if path name starts from /auth, and session is there redirect to dashboard */
    if (session && request.nextUrl.pathname.startsWith("/auth")) {
        return NextResponse.redirect(getAbsoluteUrl(siteUrls.dashboard.home));
    }

    /** if path name does not start from /auth, and session is not there redirect to login */
    if (!session && !request.nextUrl.pathname.startsWith("/auth")) {
        return NextResponse.redirect(getAbsoluteUrl(siteUrls.auth.login));
    }

    /** if path name start from admin, and session role is not admin or super admin redirect to dashboard */
    const isAdmin =
        session?.role === "Admin" || session?.role === "Super Admin";

    if (session && request.nextUrl.pathname.startsWith("/admin") && !isAdmin) {
        return NextResponse.redirect(getAbsoluteUrl(siteUrls.dashboard.home));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/auth/:path*",
        "/dashboard/:path*",
        "/profile/:path*",
        "/org/:path*",
        "/invite/:path*",
        "/admin/:path*",
    ],
};
