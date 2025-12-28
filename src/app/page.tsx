"use client";

import { useState } from 'react';
import { useVideoLibrary } from '@/hooks/useVideoLibrary';
import UploadZone from '@/components/UploadZone';
import VideoGrid from '@/components/VideoGrid';
import NetPlayer from '@/components/NetPlayer';
import { VideoFile, UserProfile } from '@/types';
import styles from './page.module.css';

import SplashScreen from '@/components/SplashScreen';
import ProfileGate from '@/components/ProfileGate';
import ProfileAvatar from '@/components/ProfileAvatar';

const AVATAR_COLORS = [
    '#E50914', // Netflix Red
    '#2B68FF', // Blue
    '#22C55E', // Green
    '#FACC15', // Yellow
    '#A855F7', // Purple
    '#EC4899', // Pink
];

export default function Home() {
    const { videos, addVideos } = useVideoLibrary();
    const [currentVideo, setCurrentVideo] = useState<VideoFile | null>(null);
    const [showSplash, setShowSplash] = useState(true);

    // Profile Management
    const [profiles, setProfiles] = useState<UserProfile[]>([
        { id: '1', name: 'User 1', color: AVATAR_COLORS[0] }
    ]);
    const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleVideoSelect = (video: VideoFile) => {
        setCurrentVideo(video);
    };

    const handleBack = () => {
        setCurrentVideo(null);
    };

    const getRandomColor = () => {
        return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
    };

    const handleAddProfile = () => {
        const name = window.prompt("Enter Profile Name:");
        if (!name || name.trim() === "") return;

        const newId = (Date.now()).toString();
        const newProfile: UserProfile = {
            id: newId,
            name: name.trim(),
            color: getRandomColor()
        };
        setProfiles([...profiles, newProfile]);
    };

    const handleEditProfile = (profile: UserProfile) => {
        const newName = window.prompt("Edit Profile Name:", profile.name);
        if (newName && newName.trim() !== "") {
            setProfiles(profiles.map(p =>
                p.id === profile.id ? { ...p, name: newName.trim() } : p
            ));
        }
    };

    const handleProfileSelect = (profile: UserProfile) => {
        setCurrentProfile(profile);
    };

    const handleSignOut = () => {
        setCurrentProfile(null);
        setCurrentVideo(null);
        setShowProfileMenu(false);
    };

    if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

    if (!currentProfile) return (
        <ProfileGate
            profiles={profiles}
            onSelect={handleProfileSelect}
            onAddProfile={handleAddProfile}
            onEditProfile={handleEditProfile}
        />
    );

    return (
        <main className={styles.main}>
            {/* Header / Netflix Logo */}
            <header className={styles.header}>
                <h1 className={styles.logo} onClick={() => setCurrentVideo(null)}>PLAYFLIX</h1>

                <div className={styles.headerRight}>
                    <div
                        className={styles.headerProfile}
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                    >
                        <ProfileAvatar
                            name={currentProfile.name}
                            avatar={currentProfile.avatar}
                            color={currentProfile.color}
                            size="small"
                        />
                    </div>
                    {/* Using toggle class for visibility */}
                    <div className={`${styles.profileDropdown} ${showProfileMenu ? styles.visible : ''}`}>
                        <div className={styles.dropdownItem} onClick={handleSignOut}>
                            Switch Profile
                        </div>
                        <div className={styles.dropdownItem} onClick={() => window.location.reload()}>
                            Sign out of Playflix
                        </div>
                    </div>
                </div>
            </header>

            {currentVideo ? (
                <NetPlayer video={currentVideo} onBack={handleBack} />
            ) : (
                <div className={styles.content}>
                    {videos.length === 0 ? (
                        <div className={styles.uploadContainer}>
                            <UploadZone onVideosSelected={addVideos} />
                        </div>
                    ) : (
                        <>
                            <div className={styles.uploadRow}>
                                <UploadZone onVideosSelected={addVideos} />
                            </div>
                            <VideoGrid videos={videos} onVideoSelect={handleVideoSelect} />
                        </>
                    )}
                </div>
            )}
        </main>
    );
}
