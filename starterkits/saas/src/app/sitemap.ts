import { blogs, docs } from "@/app/source";
import { publicRoutes, siteUrls } from "@/config/urls";
import type { MetadataRoute } from "next";

const addPathToBaseURL = (path: string) => `${siteUrls.publicUrl}${path}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const blogsSitemap = blogs.getPages().map((blog) => ({
        url: addPathToBaseURL(blog.url),
        lastModified: blog.data.exports.lastModified
            ? new Date(blog.data.exports.lastModified)
            : new Date(blog.data.publishedAt),
    }));

    const docsSitemap = docs.getPages().map((doc) => ({
        url: addPathToBaseURL(doc.url),
        lastModified: doc.data.exports.lastModified
            ? new Date(doc.data.exports.lastModified)
            : undefined,
    }));

    const publicRoutesWithoutPublicUrl = publicRoutes.filter(
        (route) =>
            route !== siteUrls.publicUrl && route !== siteUrls.rapidlaunch,
    );

    const routes = publicRoutesWithoutPublicUrl.map((route) => ({
        url: addPathToBaseURL(route),
        lastModified: new Date(),
    }));

    return [...routes, ...blogsSitemap, ...docsSitemap];
}
