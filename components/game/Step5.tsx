"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import type { Course } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

type Step5Props = {
  courses: Course[];
  onNext: () => void;
};

export default function Step5({ courses, onNext }: Step5Props) {
  const [checked, setChecked] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();

  const handleCheckboxChange = (courseId: string, isChecked: boolean) => {
    setChecked(prev => ({ ...prev, [courseId]: isChecked }));
  };
  
  const handleValidate = () => {
    if (Object.keys(checked).length === 2 && Object.values(checked).every(v => v)) {
        onNext();
    } else {
        toast({
            variant: "destructive",
            title: "Validation Error",
            description: "You must select both courses in the cart to proceed.",
        });
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          <ShoppingCart className="h-8 w-8 text-primary" />
          <CardTitle className="font-headline text-2xl">Step 5: Enrollment Cart</CardTitle>
        </div>
        <CardDescription>Your cart is ready for validation. Please review, select all courses, and proceed.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Lecture</TableHead>
              <TableHead>Tutorial</TableHead>
              <TableHead>Credits</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map(course => (
              <TableRow key={course.id}>
                <TableCell>
                  <Checkbox 
                    id={`check-${course.id}`} 
                    onCheckedChange={(isChecked) => handleCheckboxChange(course.id, !!isChecked)}
                  />
                </TableCell>
                <TableCell className="font-bold">{course.id}</TableCell>
                <TableCell>{course.selectedLecture?.id}</TableCell>
                <TableCell>{course.selectedTutorial?.id}</TableCell>
                <TableCell>{course.credits.toFixed(1)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={handleValidate} className="w-full sm:w-auto">
          Validate Enrollment <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
