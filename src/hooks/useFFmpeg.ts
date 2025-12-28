"use client";

import { useState, useRef } from 'react';
// import { FFmpeg } from '@ffmpeg/ffmpeg';

// Custom implementation to avoid "expression is too dynamic" bundler error with @ffmpeg/util
const toBlobURL = async (url: string, mimeType: string) => {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Failed to fetch ${url}`);
    const blob = await resp.blob();
    return URL.createObjectURL(new Blob([blob], { type: mimeType }));
};

const fetchFile = async (source: File | string) => {
    if (typeof source === 'string') {
        const resp = await fetch(source);
        if (!resp.ok) throw new Error(`Failed to fetch ${source}`);
        return new Uint8Array(await resp.arrayBuffer());
    } else {
        return new Uint8Array(await source.arrayBuffer());
    }
};

declare global {
    interface Window {
        FFmpegWASM?: any;
        FFmpeg?: any;
    }
}

export interface FFmpegStream {
    index: number;
    type: 'Audio' | 'Subtitle';
    language?: string;
    label?: string;
    codec?: string;
}

export const useFFmpeg = () => {
    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const ffmpegRef = useRef<any>(null);
    const logRef = useRef<string[]>([]);

    const load = async () => {
        if (loaded) return;
        setIsLoading(true);
        const baseURL = '/ffmpeg';

        try {
            // Wait for script to allow window.FFmpegWASM to populate
            let retries = 0;
            while (!window.FFmpegWASM && !window.FFmpeg && retries < 10) {
                await new Promise(r => setTimeout(r, 500));
                retries++;
            }

            // @ts-ignore
            const FFmpegClass = window.FFmpegWASM?.FFmpeg || window.FFmpeg?.FFmpeg;
            if (!FFmpegClass) throw new Error("FFmpeg script failed to load. Please check your internet connection or refresh.");

            if (!ffmpegRef.current) {
                ffmpegRef.current = new FFmpegClass();
            }

            const ffmpeg = ffmpegRef.current;

            // Capture logs for probing
            ffmpeg.on('log', ({ message }: { message: string }) => {
                // console.log(message); // Silenced per user request
                logRef.current.push(message);
            });

            await ffmpeg.load({
                coreURL: `${baseURL}/ffmpeg-core.js`,
                wasmURL: `${baseURL}/ffmpeg-core.wasm`,
                workerURL: `${baseURL}/ffmpeg-core.worker.js`,
            });
            setLoaded(true);
        } catch (e) {
            console.error("FFmpeg load failed", e);
            throw e; // Re-throw to let UI know
        } finally {
            setIsLoading(false);
        }
    };

    const mountFile = async (file: File) => {
        const ffmpeg = ffmpegRef.current;
        const data = await fetchFile(file);
        const name = file.name;
        // Clean up previous inputs (we'll just use the exact name to be safe or a generic one with correct ext)
        // Simplest strategy: always call it "input" + extension
        const ext = name.split('.').pop() || 'mkv';
        const inputName = `input.${ext}`;

        // Try to delete common previous files just in case
        try { await ffmpeg.deleteFile('input.mkv'); } catch { }
        try { await ffmpeg.deleteFile('input.mp4'); } catch { }
        try { await ffmpeg.deleteFile(inputName); } catch { }

        await ffmpeg.writeFile(inputName, data);
        return inputName;
    };

    const probeFile = async (file: File): Promise<FFmpegStream[]> => {
        if (!loaded) await load();
        const ffmpeg = ffmpegRef.current;
        logRef.current = []; // Clear logs

        const inputName = await mountFile(file);

        // Run info command
        try {
            await ffmpeg.exec(['-i', inputName]);
        } catch (e) {
            // Expected
        }

        // Parse logs
        const streamMap = new Map<number, FFmpegStream>();
        const logs = logRef.current.join('\n');

        // Improved Regex: Matches "Stream #0:1", optional hex "[0x1]", optional lang "(eng)", type, details
        // we capture: 1=index, 2=lang, 3=type, 4=details
        const streamRegex = /Stream #\d+:(\d+)(?:\[0x[0-9a-fA-F]+\])?(?:\(([^)]+)\))?:? (Audio|Subtitle): (.+)/g;
        let match;

        while ((match = streamRegex.exec(logs)) !== null) {
            const index = parseInt(match[1]);
            if (!streamMap.has(index)) {
                streamMap.set(index, {
                    index: index,
                    type: match[3] as 'Audio' | 'Subtitle',
                    language: match[2] || 'und',
                    label: match[4]?.split(',')[0]?.trim() || 'Unknown',
                    codec: match[4]?.split(' ')[0] || ''
                });
            }
        }

        return Array.from(streamMap.values());
    };

    const extractSubtitleTrack = async (track: FFmpegStream, file: File): Promise<string | null> => {
        const ffmpeg = ffmpegRef.current;
        const ext = file.name.split('.').pop() || 'mkv';
        const inputName = `input.${ext}`; // File is already mounted or will be found

        try {
            await ffmpeg.exec(['-i', inputName, '-map', `0:${track.index}`, '-f', 'webvtt', 'output.vtt', '-y']);
            const data = await ffmpeg.readFile('output.vtt');
            const blob = new Blob([data as any], { type: 'text/vtt' });
            return URL.createObjectURL(blob);
        } catch (e) {
            console.error("Subtitle extraction failed", e);
            return null;
        }
    };

    const extractAudioTrack = async (track: FFmpegStream, file: File): Promise<string | null> => {
        const ffmpeg = ffmpegRef.current;
        const ext = file.name.split('.').pop() || 'mkv';
        const inputName = `input.${ext}`;

        // Check if we can stream copy (much faster)
        // Common web-supported audio codecs
        const compatibleCodecs = ['aac', 'mp3', 'mp4a', 'opus', 'vorbis'];
        const canCopy = compatibleCodecs.some(c => track.codec?.toLowerCase().includes(c));
        const audioCodec = canCopy ? 'copy' : 'aac';

        // console.log(`Extracting audio track ${track.index} (${track.codec}) using codec: ${audioCodec}`);

        try {
            await ffmpeg.exec([
                '-i', inputName,
                '-map', '0:v:0',
                '-map', `0:${track.index}`,
                '-c:v', 'copy',
                '-c:a', audioCodec,
                '-strict', 'experimental',
                'output.mp4',
                '-y'
            ]);

            const data = await ffmpeg.readFile('output.mp4');
            const blob = new Blob([data as any], { type: 'video/mp4' });
            return URL.createObjectURL(blob);
        } catch (e) {
            console.error("Audio remux failed", e);
            return null;
        }
    };

    return { loaded, isLoading, load, probeFile, extractSubtitleTrack, extractAudioTrack };
}
