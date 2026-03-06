"use client";

import type { Clip } from "generated/prisma";
import Link from "next/dist/client/link";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Dropzone, { type DropzoneState } from "shadcn-dropzone";
import { Loader2, UploadCloud } from "lucide-react";
import { useState } from "react";
import { generateUploadUrl } from "~/actions/s3";
import { toast } from "sonner";
import { processVideo } from "~/actions/generation";

export function DashboardClient({uploadedFiles, clips}: {
    uploadedFiles: {
        id: string; 
        s3Key: string; 
        filename: string; 
        status: string; 
        clipsCount: number; 
        createdAt: Date;

}[];
 clips: Clip[];
}) {
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const handleDrop = (acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    };
    const handleUpload = async() => {
        if (files.length === 0) return;

        const file = files[0]!;
        setUploading(true);

        try{
            const {success, signedUrl, uploadedFileId} = await generateUploadUrl({
                filename: file.name,
                contentType: file.type
            });

            if(!success) throw new Error("Failed to generate upload URL");

            const uploadResponse = await fetch(signedUrl, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type,
                }
            });

                if (!uploadResponse.ok) { 
                    throw new Error(`Uploaded failed with status ${uploadResponse.status}`);
                }

                await processVideo(uploadedFileId);

                setFiles([]);

                toast.success("File uploaded successfully!", {
                    description: "Your file has been uploaded and is being processed. Check the status below.",
                    duration: 5000,
                });

        } catch (error) {
            toast.error("Upload failed", {
                description: "There was an error uploading your file. Please try again.",
                duration: 5000,
            });
        } finally {
            setUploading(false);
        }
    };
    return <div className = "mx-auto flex max-w-5xl flex-col space-y-6 px-4 py-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Podcast Clipper</h1>
                <p className="text-muted-foreground">
                    Upload your podcast episodes and create clips from them.
                </p>
            </div>
            <Link href="/dashboard/billing"><Button>Buy Credits</Button></Link>
        </div>
        <Tabs defaultValue="upload">
            <TabsList>
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="my-clips">My Clips</TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
                <Card>
                    <CardHeader>
                        <CardTitle>Upload File</CardTitle>
                        <CardDescription>
                            Upload your audio or video file to generate clips.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Dropzone onDrop={handleDrop} accept={{"video/mp4": [".mp4"]}} maxSize={500 * 1024 * 1024} disabled={uploading} maxFiles={1}>
                            {(dropzone: DropzoneState) => (
                             <>
                             <div className="flex flex-col items-center justify-center space-y-4 rounded-lg p-10 text-center">
                                    <UploadCloud className="text-muted-foreground h-12 w-12" />
                                    <p className="font-medium">Drag and drop your file</p>
                                    <p className="text-muted-foreground text-sm">or click to browse (MP4 up to 500 MB)
                                    </p>
                                </div>
                                <Button className="cursor-pointer"variant="default" size="sm" disabled={uploading}>
                                    Select File
                                    </Button>   
                                </>
                            )}    
                        </Dropzone>
                        <div className="flex items-start justify-between">
                            <div>
                                {files.length > 0 && (
                                    <div className="space-y-1 text-sm">
                                        <p className="font-medium">Selected Files:</p>
                                        {files.map((file) => (
                                            <p key = {file.name}className="text-muted-foreground">{file.name}</p>
                                        ))}
                                        </div>
                                )}
                            </div>
                            <Button disabled={files.length === 0 || uploading} onClick={handleUpload}>{uploading ? ( 
                                <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin">Uploading... 
                                </Loader2></>) : ("Upload and Generate Clips")}
                                </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
        </div>
}