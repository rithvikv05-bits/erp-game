"use client";

import type { Score, User } from '@/lib/types';

const LEADERBOARD_KEY = 'retro-reg-leaderboard';
const USER_KEY = 'retro-reg-user';

export function saveUser(name: string) {
  if (typeof window === 'undefined') return;
  const user: User = { name, startTime: Date.now() };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userString = localStorage.getItem(USER_KEY);
  if (!userString) return null;
  return JSON.parse(userString) as User;
}

export function getLeaderboard(): Score[] {
  if (typeof window === 'undefined') return [];
  const scoresString = localStorage.getItem(LEADERBOARD_KEY);
  if (!scoresString) return [];
  const scores = JSON.parse(scoresString) as Score[];
  return scores.sort((a, b) => a.time - b.time);
}

export function addScore(newScore: Omit<Score, 'date'>): Score[] {
  if (typeof window === 'undefined') return [];
  const scores = getLeaderboard();
  const finalScore: Score = {
    ...newScore,
    date: new Date().toISOString(),
  };
  
  const updatedScores = [...scores, finalScore];
  updatedScores.sort((a, b) => a.time - b.time);

  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedScores));
  return updatedScores;
}
