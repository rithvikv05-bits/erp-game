"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { Checkbox } from "../ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useToast } from "@/hooks/use-toast";
import type { Course } from "@/lib/types";

type Step6Props = {
  courses: Course[];
  onNext: () => void;
};

export default function Step6({ courses, onNext }: Step6Props) {
  const [progress, setProgress] = useState(13);
  const [isValidating, setIsValidating] = useState(true);
  const [validated, setValidated] = useState(false);
  const [checked, setChecked] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    const timer2 = setTimeout(() => setProgress(100), 1200);
    const timer3 = setTimeout(() => {
        setIsValidating(false);
        setValidated(true);
    }, 1500);
    return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
        clearTimeout(timer3);
    };
  }, []);

  const handleCheckboxChange = (courseId: string, isChecked: boolean) => {
    setChecked(prev => ({ ...prev, [courseId]: isChecked }));
  };

  const handleRegistration = () => {
     if (Object.keys(checked).length === 2 && Object.values(checked).every(v => v)) {
        onNext();
    } else {
        toast({
            variant: "destructive",
            title: "Final Step Error",
            description: "You must select both courses to finalize your registration.",
        });
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          <CheckCircle className="h-8 w-8 text-primary" />
          <CardTitle className="font-headline text-2xl">Step 6: Finalize Registration</CardTitle>
        </div>
        <CardDescription>
            {isValidating && "The system is validating your prerequisites and checking for time conflicts."}
            {validated && "Validation successful! Please confirm your choices to complete registration."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isValidating && (
            <div className="space-y-2">
                <p className="text-sm font-medium">Validation Status:</p>
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground text-center">
                    {progress < 100 ? "Validating..." : "Validation Complete!"}
                </p>
            </div>
        )}
        
        {validated && (
            <>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {courses.map(course => (
                    <TableRow key={course.id}>
                        <TableCell>
                        <Checkbox 
                            id={`final-check-${course.id}`} 
                            onCheckedChange={(isChecked) => handleCheckboxChange(course.id, !!isChecked)}
                        />
                        </TableCell>
                        <TableCell className="font-bold">{course.id}: {course.name}</TableCell>
                        <TableCell className="text-green-500 font-bold">Validated</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Button onClick={handleRegistration} disabled={isValidating} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                Complete Registration <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            </>
        )}
      </CardContent>
    </Card>
  );
}
