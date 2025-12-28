export interface VideoFile {
    id: string;
    file: File;
    url: string;
    thumbnailUrl?: string;
    name: string;
    duration?: number;
    lastPlayed?: number; // timestamp
}

export interface SubtitleTrack {
    id: string;
    label: string;
    language: string;
    url: string; // Object URL or embedded track index
    kind: 'subtitles' | 'captions';
    isEmbedded: boolean;
    trackIndex?: number;
}

export interface UserProfile {
    id: string;
    name: string;
    avatar?: string;
    color: string;
}
