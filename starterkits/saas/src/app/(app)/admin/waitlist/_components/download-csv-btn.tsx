"use client";

import { Button } from "@/components/ui/button";

export const DownloadCsvBtn = ({ data }: { data: string }) => {
    const downloadCsv = () => {
        const blob = new Blob([data], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "waitlist.csv";
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Button variant="secondary" onClick={downloadCsv}>
            Download CSV
        </Button>
    );
};
