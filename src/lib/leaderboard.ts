"use client";

import type { Score, User } from '@/lib/types';
import { supabase } from '@/lib/supabase';

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

export async function getLeaderboard(): Promise<Score[]> {
  try {
    console.log('Fetching leaderboard from Supabase...');
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .order('time', { ascending: true });

    if (error) {
      console.error('Error fetching leaderboard:', error);
      console.error('Error details:', JSON.stringify(error));
      return [];
    }

    console.log('Leaderboard data:', data);
    return data || [];
  } catch (error) {
    console.error('Catch error fetching leaderboard:', error);
    return [];
  }
}

export async function addScore(newScore: Omit<Score, 'date'>): Promise<Score[]> {
  try {
    const finalScore: Score = {
      ...newScore,
      date: new Date().toISOString(),
    };

    console.log('Adding score to Supabase:', finalScore);
    const { data, error } = await supabase
      .from('scores')
      .insert([finalScore])
      .select();

    if (error) {
      console.error('Error adding score:', error);
      console.error('Error details:', JSON.stringify(error));
      return await getLeaderboard();
    }

    console.log('Score added successfully:', data);
    return await getLeaderboard();
  } catch (error) {
    console.error('Catch error adding score:', error);
    return [];
  }
}

