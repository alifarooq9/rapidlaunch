"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { generateReactHelpers, useDropzone } from "@uploadthing/react";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { Trash2Icon } from "lucide-react";
import type { OurFileRouter } from "@/server/uploadthing/core";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Icons } from "@/components/ui/icons";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAwaitableTransition } from "@/hooks/use-awaitable-transition";
import { useRouter } from "next/navigation";
import { updateOrgImageMutation } from "@/server/actions/organization/mutations";
import type { organizations } from "@/server/db/schema";

type OrgImageFormProps = {
    currentOrg: typeof organizations.$inferSelect;
};

const PROFILE_MAX_SIZE = 4;

export function OrgImageForm({ currentOrg }: OrgImageFormProps) {
    const router = useRouter();

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const { useUploadThing } = generateReactHelpers<OurFileRouter>();

    const [files, setFiles] = useState<File[]>([]);
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    }, []);

    const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
        "orgProfilePicture",
        {
            onUploadProgress: (progress) => {
                setUploadProgress(progress);
            },
        },
    );

    const fileTypes = permittedFileInfo?.config
        ? Object.keys(permittedFileInfo?.config)
        : [];

    const { isDragActive, isDragAccept, getRootProps, getInputProps } =
        useDropzone({
            onDrop,
            accept: fileTypes
                ? generateClientDropzoneAccept(fileTypes)
                : undefined,
            maxFiles: 1,
            maxSize: PROFILE_MAX_SIZE * 1024 * 1024,
        });

    const [isPending, awaitableTransition] = useAwaitableTransition();

    const { isPending: isMutatePending, mutateAsync } = useMutation({
        mutationFn: ({ imageUrl }: { imageUrl: string }) =>
            updateOrgImageMutation({ image: imageUrl }),
    });

    const handleUpdateImage = async () => {
        try {
            const images = await startUpload(files);

            await mutateAsync({ imageUrl: images![0]!.url });

            await awaitableTransition(() => {
                router.refresh();
            });

            setFiles([]);
            setModalOpen(false);
            toast.success("Image uploaded successfully");
        } catch (error) {
            toast.error("Image could not be uploaded", {
                description: "Please check your premissions",
            });
        }
    };

    return (
        <Dialog
            onOpenChange={(o) => {
                if (isUploading) return;

                setModalOpen(o);
                setFiles([]);
            }}
            open={modalOpen}
        >
            <Card>
                <CardHeader>
                    <CardTitle>Org Image</CardTitle>
                    <CardDescription>
                        Upload a new profile image here
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage
                            src={currentOrg.image ? currentOrg.image : ""}
                        />

                        <AvatarFallback className="text-3xl">
                            {currentOrg.name[0]}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <p className="text-sm font-light text-muted-foreground">
                            Max file size: {PROFILE_MAX_SIZE}MB
                        </p>
                        <p className="text-sm font-light text-muted-foreground">
                            Recommended size: 600x600
                        </p>
                    </div>
                </CardContent>
                <CardFooter>
                    <DialogTrigger asChild>
                        <Button type="button">Upload Image</Button>
                    </DialogTrigger>
                </CardFooter>
            </Card>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Upload your org&apos;s profile image here
                    </DialogTitle>
                    <DialogDescription>
                        Please upload a profile image for your organization.
                        This will be used to identify your organization.
                    </DialogDescription>
                </DialogHeader>

                {files.length > 0 ? (
                    <div className="flex items-center gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={files[0] ? URL.createObjectURL(files[0]) : ""}
                            alt="preview"
                            className="h-36 w-36 rounded-full object-cover"
                        />

                        <Button
                            onClick={() => setFiles([])}
                            type="button"
                            variant="destructive"
                            size="icon"
                        >
                            <Trash2Icon className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div
                        {...getRootProps()}
                        className={cn(
                            "flex h-36 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-border transition-[border] hover:border-primary",
                            isDragActive && "border-primary",
                        )}
                    >
                        <input {...getInputProps()} />

                        <p className="p-8 text-center text-sm text-muted-foreground">
                            {isDragActive
                                ? isDragAccept
                                    ? "Drop the image here"
                                    : "This file type is not supported"
                                : "Drag and drop the image here, or click to select a file not more than 4MB in size."}
                        </p>
                    </div>
                )}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            disabled={
                                isUploading || isPending || isMutatePending
                            }
                            type="button"
                            variant="outline"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleUpdateImage}
                        disabled={
                            isUploading ||
                            isPending ||
                            isMutatePending ||
                            files.length === 0
                        }
                        type="button"
                        className="gap-2"
                    >
                        {isUploading || isPending || isMutatePending ? (
                            <Icons.loader className="h-4 w-4" />
                        ) : null}
                        <span>
                            {isUploading && `Uploading (${uploadProgress})`}
                            {isPending || isMutatePending ? "Setting up" : null}
                            {!isUploading && !isPending && !isMutatePending
                                ? "Upload"
                                : null}
                        </span>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
