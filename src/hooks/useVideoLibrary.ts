import { useState, useEffect, useCallback } from 'react';
import { VideoFile } from '@/types';

export function useVideoLibrary() {
    const [videos, setVideos] = useState<VideoFile[]>([]);

    const addVideos = useCallback((files: File[]) => {
        const newVideos: VideoFile[] = files.map(file => ({
            id: crypto.randomUUID(),
            file,
            url: URL.createObjectURL(file), // Create persistent URL for session
            name: file.name,
        }));

        // Generate thumbnails (async)
        newVideos.forEach(async (video) => {
            try {
                const thumb = await generateThumbnail(video.url);
                setVideos(prev => prev.map(v => v.id === video.id ? { ...v, thumbnailUrl: thumb } : v));
            } catch (e) {
                console.error('Failed to generate thumbnail', e);
            }
        });

        setVideos(prev => [...prev, ...newVideos]);
    }, []);

    // Cleanup URLs on unmount
    useEffect(() => {
        return () => {
            videos.forEach(v => URL.revokeObjectURL(v.url));
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return { videos, addVideos };
}

async function generateThumbnail(videoUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.src = videoUrl;
        video.muted = true;
        video.crossOrigin = 'anonymous'; // Not crucial for local blobs but good practice
        video.currentTime = 5; // Capture at 5s

        video.onloadeddata = () => {
            // If video is short, capture at 10%
            if (video.duration < 5) video.currentTime = video.duration * 0.1;
        };

        video.onseeked = () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg'));
            } else {
                reject('Canvas context not found');
            }
            video.remove();
        };

        video.onerror = (e) => {
            reject(e);
            video.remove();
        };

        // Trigger load
        video.load();
    });
}
