"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser, addScore } from "@/lib/leaderboard";
import type { User, Course } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import Step1 from "./game/Step1";
import Step2 from "./game/Step2";
import Step3 from "./game/Step3";
import Step4 from "./game/Step4";
import Step5 from "./game/Step5";
import Step6 from "./game/Step6";
import CompletionScreen from "./game/CompletionScreen";

export default function GameContainer() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [step, setStep] = useState(0); // 0 for loading
  const [completionTime, setCompletionTime] = useState<number | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);

  useEffect(() => {
    const loadedUser = getUser();
    if (!loadedUser) {
      router.replace("/");
    } else {
      setUser(loadedUser);
      setStep(1);
    }
  }, [router]);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const addCourse = (course: Course) => {
    setSelectedCourses(prev => [...prev, course]);
    setStep(3); // Always go to lecture selection after adding a course
  }

  const handleLectureSelect = (course: Course) => {
    setSelectedCourses(prev => prev.map(c => c.id === course.id ? course : c));
    setStep(4); // Go to tutorial selection
  }
  
  const handleTutorialSelect = (course: Course) => {
    const updatedCourses = selectedCourses.map(c => c.id === course.id ? course : c);
    setSelectedCourses(updatedCourses);

    if (currentCourseIndex === 0) {
        setCurrentCourseIndex(1); // Move to second course
        setStep(2); // Go back to course search for the second course
    } else {
        setStep(5); // Both courses selected, go to cart
    }
  }

  const handleCompletion = () => {
    if (!user) return;
    const time = Date.now() - user.startTime;
    setCompletionTime(time);
    addScore({ name: user.name, time });
    setStep((prev) => prev + 1);
  };
  
  const restartCourseSelection = () => {
    setStep(2);
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="w-full space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-10 w-32" />
          </div>
        );
      case 1:
        return <Step1 onNext={handleNextStep} />;
      case 2:
        return <Step2 
          onCourseSelect={addCourse} 
          onBack={restartCourseSelection} 
          currentCourseIndex={currentCourseIndex}
          selectedCourses={selectedCourses}
        />;
      case 3:
        return selectedCourses[currentCourseIndex] ? <Step3 course={selectedCourses[currentCourseIndex]} onNext={handleLectureSelect} /> : null;
      case 4:
        return selectedCourses[currentCourseIndex] ? <Step4 course={selectedCourses[currentCourseIndex]} onNext={handleTutorialSelect} /> : null;
      case 5:
        return <Step5 courses={selectedCourses} onNext={handleNextStep} />;
      case 6:
        return <Step6 courses={selectedCourses} onNext={handleCompletion} />;
      case 7:
        return completionTime ? <CompletionScreen time={completionTime} /> : null;
      default:
        return null;
    }
  };

  return (
      <div className="flex items-center justify-center">
        <div className="w-full max-w-4xl">
            {renderStep()}
        </div>
      </div>
  );
}
