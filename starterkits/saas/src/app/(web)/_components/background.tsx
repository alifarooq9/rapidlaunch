type BackgroundProps = {
    children: React.ReactNode;
};

export function Background({ children }: BackgroundProps) {
    return (
        <>
            <svg
                className="absolute inset-0 -z-10 h-full w-full stroke-muted-foreground/25 [mask-image:radial-gradient(100%_130%_at_top,white,transparent)]"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                        width={200}
                        height={200}
                        x="50%"
                        y={-1}
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <rect
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                    fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
                />
            </svg>
            {children}
        </>
    );
}
