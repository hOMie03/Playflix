"use client";

import React, { useEffect, useState } from 'react';
import styles from './SplashScreen.module.css';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 3500); // 3s animation + 0.5s buffer
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className={styles.container}>
            <h1 className={styles.logo}>PLAYFLIX</h1>
        </div>
    );
}
