"use client";

import { useState, useEffect } from "react";
import { getLeaderboard, getUser } from "@/lib/leaderboard";
import type { Score } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

function formatTime(milliseconds: number): string {
    return (milliseconds / 1000).toFixed(2);
}

export default function LeaderboardTable() {
  const [scores, setScores] = useState<Score[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [personalBest, setPersonalBest] = useState<number | null>(null);

  useEffect(() => {
    const board = getLeaderboard();
    setScores(board);
    
    const user = getUser();
    if(user) {
        setCurrentUser(user.name);
        const userScores = board.filter(s => s.name === user.name).map(s => s.time);
        if(userScores.length > 0) {
            setPersonalBest(Math.min(...userScores));
        }
    }
  }, []);

  if (scores.length === 0) {
    return (
      <Card className="w-full text-center py-12">
        <Trophy className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">The Leaderboard is Empty</h3>
        <p className="mt-1 text-sm text-muted-foreground">Be the first to set a record!</p>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl flex items-center gap-2"><Trophy className="text-accent h-8 w-8"/> Leaderboard</CardTitle>
        <CardDescription>Top 10 fastest registration times. All times are in seconds.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scores.slice(0, 10).map((score, index) => (
              <TableRow key={`${score.name}-${score.date}`} className={cn(score.name === currentUser && score.time === personalBest && "bg-accent/30")}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{score.name} {score.name === currentUser && score.time === personalBest && '(Your Best)'}</TableCell>
                <TableCell>{new Date(score.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right font-mono">{formatTime(score.time)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
