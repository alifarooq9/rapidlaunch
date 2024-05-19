import { publicRoutes, siteUrls } from "@/config/urls";
import { getBlogs } from "@/server/actions/blog";
import { getDocs } from "@/server/actions/docs";
import type { MetadataRoute } from "next";

const addPathToBaseURL = (path: string) => `${siteUrls.publicUrl}${path}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const allBlogs = await getBlogs();

    const blogs = allBlogs.map((blog) => ({
        url: addPathToBaseURL(`${siteUrls.blogs}/${blog.metaData.slug}`),
        lastModified: new Date(blog.metaData.updatedAt),
    }));

    const allDocs = await getDocs();

    const docs = allDocs.map((doc) => ({
        url: addPathToBaseURL(
            `${siteUrls.docs}/${doc.metaData.slug === "/" ? "" : doc.metaData.slug}`,
        ),
        lastModified: new Date(doc.metaData.publishedAt),
    }));

    const publicRoutesWithoutPublicUrl = publicRoutes.filter(
        (route) =>
            route !== siteUrls.publicUrl && route !== siteUrls.rapidlaunch,
    );

    const routes = publicRoutesWithoutPublicUrl.map((route) => ({
        url: addPathToBaseURL(route),
        lastModified: new Date(),
    }));

    return [...routes, ...blogs, ...docs];
}
