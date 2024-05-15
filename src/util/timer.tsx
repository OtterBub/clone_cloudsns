import React, { useState, useEffect } from 'react';
export default function Timer({ initSeconds, initMinutes }: { initSeconds: number, initMinutes: number }) {
    const [seconds, setSeconds] = useState(initSeconds);
    const [minutes, setMinutes] = useState(initMinutes); // Set initial minutes to 2

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (minutes === 0 && seconds === 0) {
            // Timer has expired
            clearInterval(interval!);
        } else {
            interval = setInterval(() => {
                if (seconds === 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59); // Reset seconds to 59
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        }

        // Clean up interval on component unmount
        return () => clearInterval(interval!);
    }, [minutes, seconds]);

    const formatTime = (time: number) => time.toString().padStart(2, '0');

    return (
        <p>{formatTime(minutes)}:{formatTime(seconds)}</p>
    );
};