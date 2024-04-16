import {
    WebPageHeading,
    WebPageWrapper,
} from "@/app/(web)/_components/general-components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export const blogs = [
    {
        id: 1,
        title: "Blog Post 1",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
        date: "2022-01-01",
        tumbnail: "https://fakeimg.pl/700x400/d1d1d1/6b6b6b",
    },
    {
        id: 2,
        title: "Blog Post 2",
        description: "This is the second blog post",
        date: "2022-01-02",
        tumbnail: "https://fakeimg.pl/700x400/d1d1d1/6b6b6b",
    },
    {
        id: 1,
        title: "Blog Post 1",
        description: "This is the first blog post",
        date: "2022-01-01",
        tumbnail: "https://fakeimg.pl/700x400/d1d1d1/6b6b6b",
    },
    {
        id: 2,
        title: "Blog Post 2",
        description: "This is the second blog post",
        date: "2022-01-02",
        tumbnail: "https://fakeimg.pl/700x400/d1d1d1/6b6b6b",
    },
];

export default function BlogPage() {
    return (
        <WebPageWrapper>
            <WebPageHeading title="Blog">
                <p className="text-center text-base">
                    <span>Get the latest news and updates</span>
                </p>
            </WebPageHeading>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle>
                        All the latest news and updates from our blog
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-8">
                    {blogs.map((blog) => (
                        <Link href="/" key={blog.id} className="space-y-4">
                            <div className="relative h-screen max-h-[350px] w-full overflow-hidden rounded-md bg-muted/60">
                                <Image
                                    src={blog.tumbnail}
                                    alt={blog.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h2 className="font-heading text-2xl font-semibold">
                                {blog.title}
                            </h2>
                            <p>{blog.description}</p>
                            <div className="grid gap-0.5">
                                <p className="text-sm text-muted-foreground">
                                    Created at{" "}
                                    {format(new Date(blog.date), "PPP")}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    Updated at{" "}
                                    {format(new Date(blog.date), "PPP")}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    5 min read
                                </p>
                            </div>
                        </Link>
                    ))}
                </CardContent>
            </Card>
        </WebPageWrapper>
    );
}
