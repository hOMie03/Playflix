"use client";

import React, { useRef, useState } from 'react';
import { Upload, Film } from 'lucide-react';
import styles from './UploadZone.module.css';

interface UploadZoneProps {
    onVideosSelected: (files: File[]) => void;
}

export default function UploadZone({ onVideosSelected }: UploadZoneProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const videoFiles = Array.from(e.dataTransfer.files).filter(file =>
                file.type.startsWith('video/') || file.name.endsWith('.mkv') // Basic check
            );
            if (videoFiles.length > 0) onVideosSelected(videoFiles);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const videoFiles = Array.from(e.target.files);
            onVideosSelected(videoFiles);
            // Reset input so same files can be selected again if needed
            e.target.value = '';
        }
    };

    return (
        <div
            className={`${styles.zone} ${isDragging ? styles.dragging : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input
                type="file"
                multiple
                accept="video/*,.mkv"
                ref={fileInputRef}
                onChange={handleFileChange}
                className={styles.hiddenInput}
            />
            <div className={styles.content}>
                <div className={styles.iconWrapper}>
                    <Upload size={48} className={styles.icon} />
                </div>
                <h2 className={styles.title}>Upload Videos</h2>
                <p className={styles.subtitle}>Drag & drop local video files here, or click to browse</p>
                <div className={styles.formats}>
                    <Film size={16} />
                    <span>Supports MP4, WebM, MKV (if supported by browser)</span>
                </div>
            </div>
        </div>
    );
}
