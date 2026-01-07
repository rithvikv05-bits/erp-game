"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Group, ArrowRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { Course } from "@/lib/types";
import { cn } from "@/lib/utils";

type Step4Props = {
  course: Course;
  onNext: (course: Course) => void;
};

export default function Step4({ course, onNext }: Step4Props) {
  const [selectedTutorial, setSelectedTutorial] = useState<string>("");
  const { toast } = useToast();

  const handleFinalize = () => {
    const tutorial = course.tutorials.find(t => t.id === selectedTutorial);
    if (tutorial && tutorial.status === "Open") {
      onNext({ ...course, selectedTutorial: tutorial });
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect Tutorial",
        description: "That tutorial is not available! Please choose an open one.",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "text-green-600";
      case "Full": return "text-red-500";
      case "Wait List": return "text-yellow-600";
      default: return "text-muted-foreground";
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Group className="h-8 w-8 text-primary" />
          <CardTitle className="font-headline text-2xl">Step 4: Select Tutorial Section</CardTitle>
        </div>
        <CardDescription>{course.id} has the following tutorials. You must select one.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup onValueChange={setSelectedTutorial} value={selectedTutorial}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>TA</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {course.tutorials.map(tut => (
               <TableRow key={tut.id}>
                <TableCell>
                  <RadioGroupItem value={tut.id} id={tut.id} />
                </TableCell>
                <TableCell><Label htmlFor={tut.id}>{tut.id}</Label></TableCell>
                <TableCell>{tut.time}</TableCell>
                <TableCell>{tut.ta}</TableCell>
                <TableCell className={cn("font-bold", getStatusColor(tut.status))}>{tut.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </RadioGroup>

        <Button onClick={handleFinalize} className="w-full sm:w-auto" disabled={!selectedTutorial}>
          Add to Cart <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
