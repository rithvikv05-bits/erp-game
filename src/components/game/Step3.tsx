"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks, ArrowRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { Course } from "@/lib/types";
import { cn } from "@/lib/utils";

type Step3Props = {
  course: Course;
  onNext: (course: Course) => void;
};

export default function Step3({ course, onNext }: Step3Props) {
  const [selectedSection, setSelectedSection] = useState<string>("");
  const { toast } = useToast();

  const handleFinalize = () => {
    const section = course.lectures.find(l => l.id === selectedSection);
    if (section && section.status === "Open") {
      onNext({ ...course, selectedLecture: section });
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect Section",
        description: "That section is not available! Please choose an open section.",
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
          <ListChecks className="h-8 w-8 text-primary" />
          <CardTitle className="font-headline text-2xl">Step 3: Select Lecture Section</CardTitle>
        </div>
        <CardDescription>{course.id} has the following sections available. Please select one.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup onValueChange={setSelectedSection} value={selectedSection}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {course.lectures.map(lec => (
               <TableRow key={lec.id}>
                <TableCell>
                  <RadioGroupItem value={lec.id} id={lec.id} />
                </TableCell>
                <TableCell><Label htmlFor={lec.id}>{lec.id}</Label></TableCell>
                <TableCell>{lec.time}</TableCell>
                <TableCell>{lec.instructor}</TableCell>
                <TableCell className={cn("font-bold", getStatusColor(lec.status))}>{lec.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </RadioGroup>

        <Button onClick={handleFinalize} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90" disabled={!selectedSection}>
          Select Tutorial <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
