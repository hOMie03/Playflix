"use client";

import React, { useState } from 'react';
import styles from './ProfileGate.module.css';
import { UserProfile } from '@/types';
import { Plus, Pencil } from 'lucide-react';
import ProfileAvatar from './ProfileAvatar';

interface ProfileGateProps {
    profiles: UserProfile[];
    onSelect: (profile: UserProfile) => void;
    onAddProfile: () => void;
    onEditProfile: (profile: UserProfile) => void;
}

export default function ProfileGate({ profiles, onSelect, onAddProfile, onEditProfile }: ProfileGateProps) {
    const [isManaging, setIsManaging] = useState(false);

    const handleCardClick = (profile: UserProfile) => {
        if (isManaging) {
            onEditProfile(profile);
        } else {
            onSelect(profile);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{isManaging ? "Manage Profiles:" : "Who's watching?"}</h1>

            <div className={styles.profileGrid}>
                {profiles.map(profile => (
                    <div key={profile.id} className={styles.profileCard} onClick={() => handleCardClick(profile)}>
                        <div className={`${styles.avatar} ${isManaging ? styles.dimmed : ''}`}>
                            <ProfileAvatar
                                name={profile.name}
                                avatar={profile.avatar}
                                color={profile.color}
                                size="large"
                            />
                            {isManaging && (
                                <div className={styles.editOverlay}>
                                    <Pencil size={32} color="white" />
                                </div>
                            )}
                        </div>
                        <span className={styles.name}>{profile.name}</span>
                    </div>
                ))}

                {/* Add Profile Button - Hide when managing */}
                {!isManaging && (
                    <div className={styles.profileCard} onClick={onAddProfile}>
                        <div className={`${styles.avatar} ${styles.addProfile}`}>
                            <Plus size={48} color="grey" />
                        </div>
                        <span className={styles.name}>Add Profile</span>
                    </div>
                )}
            </div>

            <button
                className={styles.manageBtn}
                onClick={() => setIsManaging(!isManaging)}
            >
                {isManaging ? "Done" : "Manage Profiles"}
            </button>
        </div>
    );
}
