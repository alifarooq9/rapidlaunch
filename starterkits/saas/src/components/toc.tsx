import type { getTableOfContents } from "@/lib/toc";
import { cn } from "@/lib/utils";
import Link from "next/link";

type TocProps = {
    toc: Awaited<ReturnType<typeof getTableOfContents>>;
    wrapperClassName?: string;
};

export function Toc({ toc, wrapperClassName }: TocProps) {
    return (
        <div className={cn(wrapperClassName, "grid gap-4")}>
            <p className="text-sm font-semibold">On this page</p>
            <ul className="grid gap-2">
                {toc.items?.map((item) => (
                    <li
                        key={item.url}
                        className="text-sm text-muted-foreground"
                    >
                        {item.items ? (
                            <>
                                <Link href={item.url}>{item.title}</Link>
                                <ul className="mt-2 grid gap-2 pl-4">
                                    {item.items.map((subItem) => (
                                        <li key={subItem.url}>
                                            <Link href={subItem.url}>
                                                {subItem.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <Link href={item.url}>{item.title}</Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
