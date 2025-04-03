
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Code, BookOpen, Brain, Star, Building, Server, Database, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type LearningGoal = {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
};

interface LearningGoalSelectorProps {
  onSelectGoal: (goalId: string) => void;
  selectedGoalId: string | null;
}

const LearningGoalSelector: React.FC<LearningGoalSelectorProps> = ({ 
  onSelectGoal,
  selectedGoalId
}) => {
  const learningGoals: LearningGoal[] = [
    {
      id: "web-development",
      title: "Web Development",
      icon: <Code className="h-5 w-5 text-blue-500" />,
      description: "Learn to build responsive websites and web applications"
    },
    {
      id: "data-science",
      title: "Data Science",
      icon: <Database className="h-5 w-5 text-purple-500" />,
      description: "Master data analysis, visualization, and machine learning"
    },
    {
      id: "algorithms",
      title: "Algorithms & Data Structures",
      icon: <Brain className="h-5 w-5 text-orange-500" />,
      description: "Develop problem-solving skills with algorithms and data structures"
    },
    {
      id: "software-architecture",
      title: "Software Architecture",
      icon: <Building className="h-5 w-5 text-green-500" />,
      description: "Design scalable, maintainable software systems"
    },
    {
      id: "backend-development",
      title: "Backend Development",
      icon: <Server className="h-5 w-5 text-red-500" />,
      description: "Build server-side applications and APIs"
    },
    {
      id: "computer-science",
      title: "Computer Science Fundamentals",
      icon: <BookOpen className="h-5 w-5 text-yellow-500" />,
      description: "Understand core computer science concepts"
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 text-brand-blue mr-2" />
          Set Your Learning Goal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {learningGoals.map((goal) => (
            <TooltipProvider key={goal.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant={selectedGoalId === goal.id ? "default" : "outline"}
                    className={`flex items-center gap-1 px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                      selectedGoalId === goal.id ? "bg-brand-blue text-white hover:bg-brand-blue/90" : ""
                    }`}
                    onClick={() => onSelectGoal(goal.id)}
                  >
                    {goal.icon}
                    {goal.title}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{goal.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-500 italic">
            {selectedGoalId 
              ? "We'll personalize your learning path based on this goal. Click on any step in the path below to start learning." 
              : "Select a goal to get personalized learning recommendations"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningGoalSelector;
