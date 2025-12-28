"use client";

import React, { useRef, useState, useEffect } from 'react';
import Script from 'next/script';
import { VideoFile } from '@/types';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, ArrowLeft, Settings, Captions, Loader2 } from 'lucide-react';
import styles from './NetPlayer.module.css';
import { srtToWebvtt } from '@/utils/subtitle';
import { useFFmpeg } from '@/hooks/useFFmpeg';

interface NetPlayerProps {
    video: VideoFile;
    onBack: () => void;
}

export default function NetPlayer({ video, onBack }: NetPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const subtitleInputRef = useRef<HTMLInputElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [showSettings, setShowSettings] = useState(false);

    // Tracks State
    const [subtitleUrl, setSubtitleUrl] = useState<string | null>(null);
    const [audioTracks, setAudioTracks] = useState<any[]>([]);
    const [textTracks, setTextTracks] = useState<TextTrack[]>([]);
    const [selectedAudioIndex, setSelectedAudioIndex] = useState(0);
    const [selectedTextTrackIndex, setSelectedTextTrackIndex] = useState(-1); // -1 = off
    const [selectedFFmpegSubtitleIndex, setSelectedFFmpegSubtitleIndex] = useState<number | null>(null);

    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Auto play
        if (videoRef.current) {
            videoRef.current.play().catch(e => console.log('Autoplay blocked', e));
            setIsPlaying(true);

            // Delay to let tracks load
            setTimeout(() => {
                scanTracks();
                // Auto run deep scan silently
                if (video.file) handleDeepScan(false);
            }, 1000);
        }
    }, []);

    const scanTracks = () => {
        if (!videoRef.current) return;
        const vid = videoRef.current as any;

        // Audio Tracks (Experimental / Vendor specific)
        const aTracks = vid.audioTracks || vid.mozAudioTracks || vid.webkitAudioTracks;
        if (aTracks) {
            const tracks = [];
            for (let i = 0; i < aTracks.length; i++) {
                tracks.push(aTracks[i]);
                if (aTracks[i].enabled) setSelectedAudioIndex(i);
            }
            setAudioTracks(tracks);
        }

        // Text Tracks (Native)
        // Filter out metadata tracks if any
        const tTracks = Array.from(videoRef.current.textTracks).filter(t => t.kind === 'subtitles' || t.kind === 'captions');
        setTextTracks(tTracks);

        // Check if any is showing
        const showingIndex = tTracks.findIndex(t => t.mode === 'showing');
        setSelectedTextTrackIndex(showingIndex);
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying && !showSettings) setShowControls(false);
        }, 3000);
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const duration = videoRef.current.duration || 1;
            setProgress((current / duration) * 100);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        if (videoRef.current) {
            const duration = videoRef.current.duration || 1;
            videoRef.current.currentTime = (val / 100) * duration;
            setProgress(val);
        }
    };

    const toggleVolume = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (videoRef.current) {
            videoRef.current.volume = val;
            setIsMuted(val === 0);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const formatTime = (seconds: number) => {
        if (!seconds) return "0:00";
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = date.getUTCSeconds().toString().padStart(2, '0');
        if (hh) {
            return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
        }
        return `${mm}:${ss}`;
    };

    // --- Subtitle & Audio Handling ---

    const handleSubtitleAddClick = () => {
        subtitleInputRef.current?.click();
        setShowSettings(false);
    };

    const handleSubtitleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const text = await file.text();
            let vttContent = text;

            if (file.name.endsWith('.srt')) {
                vttContent = srtToWebvtt(text);
            }

            if (subtitleUrl) URL.revokeObjectURL(subtitleUrl);

            const blob = new Blob([vttContent], { type: 'text/vtt' });
            const url = URL.createObjectURL(blob);
            setSubtitleUrl(url);

            // We need to wait for the track to be added to DOM
            setTimeout(() => {
                scanTracks();
                // Automatically select the new track (it will be the last one likely, or we find it)
                if (videoRef.current) {
                    const tracks = Array.from(videoRef.current.textTracks);
                    // The new track is likely the last one
                    const newIndex = tracks.length - 1;
                    selectTextTrack(newIndex);
                }
            }, 500);
        }
    };

    const selectAudioTrack = (index: number) => {
        if (!videoRef.current) return;
        const vid = videoRef.current as any;
        const aTracks = vid.audioTracks || vid.mozAudioTracks || vid.webkitAudioTracks;

        if (aTracks) {
            for (let i = 0; i < aTracks.length; i++) {
                aTracks[i].enabled = (i === index);
            }
            setSelectedAudioIndex(index);
        }
    };

    const selectTextTrack = (index: number) => {
        setSelectedTextTrackIndex(index);
        if (!videoRef.current) return;

        const tracks = Array.from(videoRef.current.textTracks).filter(t => t.kind === 'subtitles' || t.kind === 'captions');

        tracks.forEach((track, i) => {
            if (i === index) {
                track.mode = 'showing';
            } else {
                track.mode = 'hidden'; // or disabled
            }
        });
    };

    // FFmpeg Integration
    const { loaded: ffmpegLoaded, isLoading: ffmpegLoading, load: loadFFmpeg, probeFile, extractSubtitleTrack, extractAudioTrack } = useFFmpeg();
    const [isScanning, setIsScanning] = useState(false);
    const [scannedTracks, setScannedTracks] = useState<{ audio: any[], subtitles: any[] } | null>(null);

    const handleDeepScan = async (manual: boolean = true) => {
        setIsScanning(true);
        try {
            if (!ffmpegLoaded) {
                await loadFFmpeg();
            }

            if (video.file) {
                const streams = await probeFile(video.file);
                const audio = streams.filter(s => s.type === 'Audio');
                const subtitles = streams.filter(s => s.type === 'Subtitle');

                setScannedTracks({ audio, subtitles });

                // Show alert if ANY tracks are found
                if (manual) {
                    if (audio.length > 0 || subtitles.length > 0) {
                        alert(`Scan Complete! Found ${audio.length} audio and ${subtitles.length} subtitle tracks.`);
                    } else {
                        alert("Scan Complete! No compatible embedded tracks found. (Check console for FFmpeg logs)");
                    }
                }
            }
        } catch (e) {
            console.error(e);
            if (manual) alert("Scan failed. Ensure the FFmpeg script is loaded.");
        } finally {
            setIsScanning(false);
        }
    };

    const [processingTrackId, setProcessingTrackId] = useState<number | null>(null);

    const handleFFmpegAudioSelect = async (track: any) => {
        if (isScanning || processingTrackId !== null) return;
        setIsScanning(true);
        setProcessingTrackId(track.index);

        if (!video.file) return;

        try {
            const url = await extractAudioTrack(track, video.file);
            if (url) {
                if (videoRef.current) {
                    const currentTime = videoRef.current.currentTime;
                    // Changing src pauses the video, we must force play if it was playing
                    videoRef.current.src = url;
                    videoRef.current.currentTime = currentTime;

                    try {
                        await videoRef.current.play();
                    } catch (err) {
                        console.error("Auto-play failed", err);
                    }

                    // Update UI
                    setSelectedAudioIndex(track.index);
                }
            } else {
                alert("Failed to process audio track. See console.");
            }
        } catch (e) {
            console.error(e);
            alert("Audio switch error.");
        } finally {
            setIsScanning(false);
            setProcessingTrackId(null);
        }
    };

    const handleFFmpegSubtitleSelect = async (track: any) => {
        setIsScanning(true);
        if (!video.file) return;

        try {
            const url = await extractSubtitleTrack(track, video.file);
            if (url) {
                setSubtitleUrl(url);
                // Clear native selection
                setSelectedTextTrackIndex(-1);
                // Set FFmpeg selection
                setSelectedFFmpegSubtitleIndex(track.index);

                setTimeout(() => {
                    // Force the track element to be default
                    if (videoRef.current) {
                        const tracks = videoRef.current.querySelectorAll('track');
                        tracks.forEach(t => t.default = true);
                    }
                }, 100);
            } else {
                alert("Failed to extract subtitle.");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsScanning(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if typing in an input (though we only have file input currently)
            if ((e.target as HTMLElement).tagName === 'INPUT') return;

            switch (e.key.toLowerCase()) {
                case ' ':
                case 'k':
                    e.preventDefault(); // Prevent scrolling
                    togglePlay();
                    break;
                case 'f':
                    e.preventDefault();
                    toggleFullscreen();
                    break;
                case 'arrowright':
                case 'l':
                    e.preventDefault();
                    if (videoRef.current) {
                        videoRef.current.currentTime += 10;
                        handleMouseMove(); // Show controls
                    }
                    break;
                case 'arrowleft':
                case 'j':
                    e.preventDefault();
                    if (videoRef.current) {
                        videoRef.current.currentTime -= 10;
                        handleMouseMove();
                    }
                    break;
                case 'm':
                    toggleVolume();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying, isFullscreen, isMuted, volume]); // Ref dependencies are stable, but state needs to be fresh

    useEffect(() => {
        return () => {
            if (subtitleUrl) URL.revokeObjectURL(subtitleUrl);
        };
    }, [subtitleUrl]);

    return (
        <div
            ref={containerRef}
            className={styles.playerContainer}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && !showSettings && setShowControls(false)}
        >
            <Script src="/ffmpeg/ffmpeg.js" strategy="lazyOnload" />
            <video
                ref={videoRef}
                src={video.url}
                className={`${styles.video} ${showControls ? styles.videoWithControls : ''}`}
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            >
                {subtitleUrl && <track kind="subtitles" src={subtitleUrl} label="Active Subtitle" default />}
            </video>

            <input
                type="file"
                ref={subtitleInputRef}
                onChange={handleSubtitleFileChange}
                accept=".srt,.vtt"
                style={{ display: 'none' }}
            />

            {/* Settings Menu */}
            {showSettings && (
                <div className={styles.settingsMenu}>
                    <div className={styles.settingsColumn}>
                        <h4>Audio</h4>
                        {/* Native Tracks */}
                        {audioTracks.map((track, i) => (
                            <div
                                key={`native-${i}`}
                                className={`${styles.settingsOption} ${selectedAudioIndex === i ? styles.selected : ''}`}
                                onClick={() => selectAudioTrack(i)}
                            >
                                {track.label || track.language || `Track ${i + 1}`}
                            </div>
                        ))}

                        {/* Scanned FFmpeg Tracks */}
                        {scannedTracks?.audio.map((track) => (
                            <div
                                key={`ffmpeg-audio-${track.index}`}
                                className={`${styles.settingsOption} ${selectedAudioIndex === track.index ? styles.selected : ''}`}
                                onClick={() => handleFFmpegAudioSelect(track)}
                                style={{ opacity: (isScanning && processingTrackId !== track.index) ? 0.5 : 1, pointerEvents: isScanning ? 'none' : 'auto' }}
                            >
                                {processingTrackId === track.index ? (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Loader2 className={styles.spin} size={14} /> Switching...
                                    </span>
                                ) : (
                                    <><span style={{ opacity: 0.7 }}>[Deep Scan]</span> {track.language} ({track.codec})</>
                                )}
                            </div>
                        ))}

                        {audioTracks.length === 0 && (!scannedTracks || scannedTracks.audio.length === 0) && (
                            <div className={styles.settingsOptionDisabled}>Default Audio</div>
                        )}
                    </div>

                    <div className={styles.settingsColumn}>
                        <h4>Subtitles</h4>
                        <div
                            className={`${styles.settingsOption} ${selectedTextTrackIndex === -1 && selectedFFmpegSubtitleIndex === null ? styles.selected : ''}`}
                            onClick={() => {
                                selectTextTrack(-1);
                                setSelectedFFmpegSubtitleIndex(null);
                                setSubtitleUrl(null);
                            }}
                        >
                            Off
                        </div>

                        {/* Native Tracks */}
                        {textTracks.map((track, i) => (
                            <div
                                key={`native-${i}`}
                                className={`${styles.settingsOption} ${selectedTextTrackIndex === i ? styles.selected : ''}`}
                                onClick={() => selectTextTrack(i)}
                            >
                                {track.label || track.language || `Track ${i + 1}`}
                            </div>
                        ))}

                        {/* Scanned FFmpeg Tracks */}
                        {scannedTracks?.subtitles.map((track) => (
                            <div
                                key={`ffmpeg-sub-${track.index}`}
                                className={`${styles.settingsOption} ${selectedFFmpegSubtitleIndex === track.index ? styles.selected : ''}`}
                                onClick={() => handleFFmpegSubtitleSelect(track)}
                            >
                                <span style={{ opacity: 0.7 }}>[Deep Scan]</span> {track.language} ({track.label})
                            </div>
                        ))}

                        <div className={styles.settingsDivider} />
                        <div className={styles.settingsOption} onClick={handleSubtitleAddClick}>
                            Upload .srt...
                        </div>

                        <div className={styles.settingsDivider} />
                        <div className={styles.settingsOption} onClick={() => handleDeepScan(true)} style={{ color: scannedTracks ? '#4CAF50' : '#aaa', fontSize: '0.8rem' }}>
                            {isScanning ? (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Loader2 className={styles.spin} size={14} /> Scanning...
                                </span>
                            ) : (
                                scannedTracks ? "Rescan File" : "Deep Scan (FFmpeg)"
                            )}
                        </div>
                    </div>
                </div >
            )}
            {/* Overlay */}
            <div className={`${styles.controlsOverlay} ${!showControls ? styles.hidden : ''}`}>
                <div className={styles.topBar}>
                    <button onClick={onBack} className={styles.iconBtn}>
                        <ArrowLeft size={32} />
                    </button>
                    <h3 className={styles.title}>{video.name}</h3>
                </div>

                {!isPlaying && (
                    <div className={styles.centerPlay} onClick={togglePlay}>
                        <Play size={64} fill="white" />
                    </div>
                )}

                <div className={styles.bottomBar}>
                    <div className={styles.progressContainer}>
                        <input
                            type="range"
                            className={styles.progressBar}
                            min="0"
                            max="100"
                            step="0.1"
                            value={progress}
                            onChange={handleSeek}
                            style={{ backgroundSize: `${progress}% 100%` }}
                        />
                    </div>

                    <div className={styles.controlsRow}>
                        <div className={styles.leftControls}>
                            <button onClick={togglePlay} className={styles.iconBtn}>
                                {isPlaying ? <Pause fill="white" /> : <Play fill="white" />}
                            </button>

                            <button onClick={() => {
                                if (videoRef.current) videoRef.current.currentTime -= 10;
                            }} className={styles.textBtn}>-10s</button>

                            <button onClick={() => {
                                if (videoRef.current) videoRef.current.currentTime += 10;
                            }} className={styles.textBtn}>+10s</button>

                            <div className={styles.volumeContainer}>
                                <button onClick={toggleVolume} className={styles.iconBtn}>
                                    {isMuted || volume === 0 ? <VolumeX /> : <Volume2 />}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    className={styles.volumeSlider}
                                />
                            </div>

                            <span className={styles.timeDisplay}>
                                {videoRef.current ? formatTime(videoRef.current.currentTime) : "0:00"}
                                {" / "}
                                {videoRef.current ? formatTime(videoRef.current.duration) : "0:00"}
                            </span>
                        </div>

                        <div className={styles.rightControls}>
                            {/* Settings Button (Audio/Subtitles) */}
                            <button
                                className={`${styles.iconBtn} ${showSettings ? styles.activeBtn : ''}`}
                                onClick={() => setShowSettings(!showSettings)}
                                title="Audio & Subtitles"
                            >
                                <Captions />
                            </button>

                            <button onClick={toggleFullscreen} className={styles.iconBtn}>
                                {isFullscreen ? <Minimize /> : <Maximize />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
