import React from 'react';
import { VideoFile } from '@/types';
import { Play } from 'lucide-react';
import styles from './VideoGrid.module.css';

interface VideoGridProps {
    videos: VideoFile[];
    onVideoSelect: (video: VideoFile) => void;
}

export default function VideoGrid({ videos, onVideoSelect }: VideoGridProps) {
    if (videos.length === 0) return null;

    return (
        <div className={styles.gridContainer}>
            <h2 className={styles.sectionTitle}>My List</h2>
            <div className={styles.grid}>
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className={styles.card}
                        onClick={() => onVideoSelect(video)}
                    >
                        <div className={styles.thumbnailWrapper}>
                            {video.thumbnailUrl ? (
                                <img src={video.thumbnailUrl} alt={video.name} className={styles.thumbnail} />
                            ) : (
                                <div className={styles.placeholderThumb} />
                            )}
                            <div className={styles.overlay}>
                                <div className={styles.playButton}>
                                    <Play fill="white" size={24} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.info}>
                            <h3 className={styles.videoTitle}>{video.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
