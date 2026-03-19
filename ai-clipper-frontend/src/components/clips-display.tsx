"use client";

import { error } from "console";
import type { Clip } from "generated/prisma";
import { url } from "inspector/promises";
import { useEffect, useState } from "react";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { env } from "~/env";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Download, Loader2, Play } from "lucide-react";
import {  getClipPlayUrl } from "~/actions/generation";
import { Button } from "./ui/button";


function ClipCard ({clip}: {clip: Clip}) {
    const [playUrl, setPlayUrl] = useState<string | null>(null);
    const [isLoadingUrl, setIsLoadingUrl] = useState(true);

    useEffect(() => {
        async function fetchPlayUrl() {
            setIsLoadingUrl(true);
            try{
                const result = await getClipPlayUrl(clip.id);
                console.log("getClipPlayUrl result:", result);
                if(result.success && result.url) {
                    setPlayUrl(result.url);
                } else if (result.error) {
                    console.error("Error fetching play URL:", result.error);
                }
            } catch (error) {
                console.error("getClipPlayUrl error:", error); // add this
                return { success: false, error: "Failed to generate play URL." };
            } finally {
                setIsLoadingUrl(false);
            }
        }
        void fetchPlayUrl();
}, [clip.id]);

const handleDownload = () => {
    if (playUrl){
    const link = document.createElement("a");
    link.href = playUrl;
    link.style.display = "none";
    document.body.append(link);
    link.click()
    document.body.removeChild(link);
}
};

    return <div className="flex max-w-52 flex-col gap-2">
        <div className="bg-muted relative aspect-video w-full rounded-md overflow-hidden">
            {isLoadingUrl ? <div className="flex h-full w-full items-center justify-center"><Loader2 className="text-muted-foreground h-8 w-8 animate-spin"></Loader2></div> : playUrl ? (
                <video 
                src={playUrl} 
                controls preload="metadata" 
                className="h-full w-full rounded-md object-cover"
                />
            ) : (<div className="flex h-full w-full items-center justify-center">
                <Play className="text-muted-foreground h-10 w-10 opacity-50"></Play>
                </div> 
            )}
        </div>
        <div className="flex flex-col gap-2"><Button onClick={handleDownload} variant="outline" size="sm"><Download className="mr-1.5 h-4 w-4"/>Download</Button></div>
    </div>
}


export function ClipsDisplay({ clips }: { clips: Clip[] }) {
    if (clips.length === 0) { 
        return (
        <p className="text-muted-foreground p-4 text-center">No clips generated</p>
        );
    }
    return(
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {clips.map((clip) => (
                <ClipCard key={clip.id} clip={clip} />
            ))}
        </div>
    );
}

