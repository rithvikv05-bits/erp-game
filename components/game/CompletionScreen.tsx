"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PartyPopper, Trophy } from "lucide-react";

type CompletionScreenProps = {
  time: number;
};

function formatTime(milliseconds: number): string {
    const totalSeconds = (milliseconds / 1000).toFixed(2);
    return `${totalSeconds} seconds`;
}


export default function CompletionScreen({ time }: CompletionScreenProps) {
  return (
    <Card className="w-full text-center">
      <CardHeader>
        <div className="flex items-center justify-center gap-4">
          <PartyPopper className="h-10 w-10 text-accent" />
          <CardTitle className="font-headline text-3xl">Registration Complete!</CardTitle>
        </div>
        <CardDescription>Congratulations, you've successfully navigated the maze!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-6 border rounded-lg bg-muted/50">
          <p className="text-lg text-muted-foreground">Your Time:</p>
          <p className="text-5xl font-bold font-mono text-primary">{formatTime(time)}</p>
        </div>
        <p>Think you can do better? Try again, or check out the leaderboard to see how you stack up.</p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button asChild className="w-full sm:w-auto">
                <Link href="/leaderboard">
                    <Trophy className="mr-2 h-4 w-4" />
                    View Leaderboard
                </Link>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
