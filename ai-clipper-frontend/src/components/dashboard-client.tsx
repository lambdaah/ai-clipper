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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge"
import { useRouter } from "next/navigation";
import { ClipsDisplay } from "./clips-display";

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
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    const handleRefresh = async() => {
        setRefreshing(true);
        router.refresh();
        setTimeout(() => setRefreshing(false), 600);
    };

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
                <h1 className="text-2xl font-semibold tracking-tight">Clypso</h1>
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
                        <div className="mt-2 flex items-start justify-between">
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

                        {uploadedFiles.length > 0 && (
                            <div className="pt-6">
                                <div className="mb-2 flex items-center justify-between">
                                <h3 className="text-md mb-2 font-medium">Queue Status</h3>
                                <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
                                    {refreshing && (<Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>)}
                                    Refresh
                                </Button>
                                </div>
                                <div className="max-h-[300px] overflow-y-auto rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>File</TableHead>
                                                <TableHead>Uploaded</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Clips Generated</TableHead>
                                                </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {uploadedFiles.map((item) => (
                                                <TableRow key = {item.id}>
                                                    <TableCell className="max-w-xs truncate font-medium">{item.filename}</TableCell>
                                                    <TableCell className="text-muted-foreground text-sm">{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                                                    <TableCell> 
                                                    {item.status === "queued" && (<Badge variant="outline">Queued</Badge>)}
                                                    {item.status === "processing" && (<Badge variant="outline">Processing</Badge>)}
                                                    {item.status === "processed" && (<Badge variant="outline">Processed</Badge>)}
                                                    {item.status === "no credits" && (<Badge variant="destructive">No Credits</Badge>)}
                                                    {item.status === "failed" && (<Badge variant="destructive">Failed</Badge>)}
                                                    </TableCell>
                                                    <TableCell>{item.clipsCount > 0 ? (<span>{item.clipsCount} clip{item.clipsCount !== 1 ? 's' : ''}</span>) : (<span className="text-muted-foreground">No clips yet</span>)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                
                                </div>
                            )} 

                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="my-clips">
                <Card>
                    <CardHeader>
                            <CardTitle>My Clips</CardTitle>
                            <CardDescription>View and manage your generated clips. Processing may take a few minutes</CardDescription>
                    </CardHeader>
                    <CardContent><ClipsDisplay clips={clips}></ClipsDisplay></CardContent>
                </Card>
            </TabsContent>

        </Tabs>
        </div>
}