"use client";

import { useState, useEffect } from 'react';

function formatTime(milliseconds: number): string {
  if (milliseconds < 0) milliseconds = 0;
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function useTimer(startTime: number | null) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (startTime === null) {
        setElapsedTime(0);
        return;
    };

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return formatTime(elapsedTime);
}
