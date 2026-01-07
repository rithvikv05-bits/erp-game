"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import { allCourses } from "@/lib/courses";
import type { Course } from "@/lib/types";
import { ScrollArea } from "../ui/scroll-area";

type Step2Props = {
  onCourseSelect: (course: Course) => void;
  onBack: () => void;
  currentCourseIndex: number;
  selectedCourses: Course[];
};

const REQUIRED_COURSES = ["CS-404", "CS-499"];

export default function Step2({ onCourseSelect, onBack, currentCourseIndex, selectedCourses }: Step2Props) {
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const requiredCourseId = REQUIRED_COURSES[currentCourseIndex];

  const handleSelect = (course: Course) => {
    if (selectedCourses.find(c => c.id === course.id)) {
      toast({
        variant: "destructive",
        title: "Course Already Selected",
        description: "You have already added this course to your cart.",
      });
      return;
    }
    
    if (course.id === requiredCourseId) {
      onCourseSelect(course);
    } else {
      toast({
        variant: "destructive",
        title: "Wrong Course!",
        description: `That's not the required course. You need to find ${requiredCourseId}.`,
      });
    }
  }

  const filteredCourses = allCourses.filter(course => 
    course.name.toLowerCase().includes(search.toLowerCase()) || 
    course.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Search className="h-8 w-8 text-primary" />
          <CardTitle className="font-headline text-2xl">Step 2: Find Course ({currentCourseIndex + 1}/2)</CardTitle>
        </div>
        <CardDescription>
          Use the state-of-the-art search function to find your required course: <span className="font-bold text-primary">{requiredCourseId}</span>.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
            <Input 
              placeholder="Search for courses..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button disabled>Search</Button>
        </div>
        
        <ScrollArea className="h-72 w-full rounded-md border p-4">
          <div className="space-y-2">
            {filteredCourses.map(course => (
              <div 
                key={course.id}
                className="p-4 border rounded-lg hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                onClick={() => handleSelect(course)}
                onKeyDown={(e) => e.key === 'Enter' && handleSelect(course)}
                role="button"
                tabIndex={0}
                aria-label={`Select course ${course.name}`}
              >
                <h4 className="font-semibold">{course.id}: {course.name}</h4>
                <p className="text-sm">{course.description}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
