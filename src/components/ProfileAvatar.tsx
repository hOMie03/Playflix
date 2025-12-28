"use client";

import React from 'react';
import styles from './ProfileAvatar.module.css';

interface ProfileAvatarProps {
    name: string;
    avatar?: string;
    color: string;
    size?: 'small' | 'large';
}

export default function ProfileAvatar({ name, avatar, color, size = 'large' }: ProfileAvatarProps) {
    const initial = name.charAt(0).toUpperCase();

    return (
        <div
            className={`${styles.avatarContainer} ${styles[size]}`}
            style={{ backgroundColor: color }}
        >
            {avatar ? (
                <img src={avatar} alt={name} className={styles.image} />
            ) : (
                <span className={styles.initial}>{initial}</span>
            )}
        </div>
    );
}
