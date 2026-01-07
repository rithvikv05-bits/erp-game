"use client";

import { useState, useEffect } from "react";
import { useTimer } from "@/hooks/use-timer";
import { getUser } from "@/lib/leaderboard";

export default function Timer() {
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setStartTime(user.startTime);
    }
  }, []);

  const elapsedTime = useTimer(startTime);

  return <span data-testid="timer-display">{elapsedTime}</span>;
}
