"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ArrowRight } from "lucide-react";

type Step1Props = {
  onNext: () => void;
};

export default function Step1({ onNext }: Step1Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          <BookOpen className="h-8 w-8 text-primary" />
          <CardTitle className="font-headline text-2xl">Step 1: Academic Requirements</CardTitle>
        </div>
        <CardDescription>First, let's check your degree progress to see which courses you need.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border rounded-lg bg-muted/50">
          <h4 className="font-semibold mb-2">Degree: B.E. in Computer Science</h4>
          <p className="text-sm text-muted-foreground">You have four remaining requirements to fulfill:</p>
          <ul className="text-sm text-muted-foreground mt-2 ml-4 list-disc">
            <li>Two CS Discipline Electives</li>
            <li>Two Open Electives (any department)</li>
          </ul>
        </div>
        <p>Looks like you're cleared to find your electives. Let's proceed.</p>
        <Button onClick={onNext} className="w-full sm:w-auto">
          Find Courses <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
