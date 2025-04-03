
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Route, BookOpen, Code, Brain, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface LearningStep {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  completed?: boolean;
}

interface LearningPathSection {
  title: string;
  steps: LearningStep[];
}

interface RecommendedLearningPathProps {
  goalId: string | null;
  learningPath: LearningPathSection[];
  currentProgress: number;
  onSelectStep: (stepId: string, title: string) => void;
}

const RecommendedLearningPath: React.FC<RecommendedLearningPathProps> = ({
  goalId,
  learningPath,
  currentProgress,
  onSelectStep
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Calculate which steps should be unlocked based on progress
  const calculateUnlocked = (index: number, stepIndex: number) => {
    const totalSteps = learningPath.reduce((acc, section) => acc + section.steps.length, 0);
    const stepNumber = learningPath.slice(0, index).reduce((acc, section) => acc + section.steps.length, 0) + stepIndex + 1;
    const percentPerStep = 100 / totalSteps;
    
    return currentProgress >= (stepNumber - 1) * percentPerStep;
  };

  const handleStepClick = (step: LearningStep, isUnlocked: boolean, sectionIndex: number, stepIndex: number) => {
    if (!isUnlocked) {
      toast({
        title: "Step locked",
        description: "Complete previous steps to unlock this content.",
        variant: "warning"
      });
      return;
    }

    if (step.completed) {
      toast({
        title: "Step already completed",
        description: "You've already completed this step. Review it again?",
      });
    }

    // Track the step selection by passing the step ID and title to parent component
    onSelectStep(step.id, step.title);

    // Auto-generate a query based on the step title and description
    const query = `Help me learn about ${step.title}: ${step.description}`;
    
    // Store the query in localStorage to be used in the learning form
    localStorage.setItem('learning_query', query);
    
    // Focus on the learning form input (will be handled by the parent component)
    document.getElementById('question')?.focus();
  };

  if (!goalId || learningPath.length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Route className="h-5 w-5 text-brand-blue mr-2" />
            Your Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Sparkles className="h-10 w-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">Select a learning goal to see your personalized path</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Route className="h-5 w-5 text-brand-blue mr-2" />
          Your Personalized Learning Path
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {learningPath.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border-l-2 border-gray-200 pl-4 ml-2">
              <h3 className="font-semibold text-lg mb-3">{section.title}</h3>
              <div className="space-y-3">
                {section.steps.map((step, stepIndex) => {
                  const isUnlocked = calculateUnlocked(sectionIndex, stepIndex);
                  
                  return (
                    <div 
                      key={step.id} 
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        step.completed ? 'bg-green-50 border-green-200 hover:bg-green-100' : 
                        isUnlocked ? 'bg-white border-gray-200 hover:border-brand-blue hover:shadow-sm' : 'bg-gray-50 border-gray-200 opacity-70'
                      }`}
                      onClick={() => handleStepClick(step, isUnlocked, sectionIndex, stepIndex)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                          step.completed ? 'bg-green-500' : 
                          isUnlocked ? 'bg-brand-blue' : 'bg-gray-300'
                        }`}>
                          {step.completed ? (
                            <Check className="h-4 w-4 text-white" />
                          ) : isUnlocked ? (
                            <span className="text-xs text-white font-bold">
                              {sectionIndex * section.steps.length + stepIndex + 1}
                            </span>
                          ) : (
                            <Lock className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{step.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge 
                              variant={
                                step.difficulty === 'beginner' ? 'info' : 
                                step.difficulty === 'intermediate' ? 'warning' : 
                                'destructive'
                              }
                              className="text-xs"
                            >
                              {step.difficulty.charAt(0).toUpperCase() + step.difficulty.slice(1)}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {step.estimatedTime}
                            </span>
                            {isUnlocked && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-xs text-brand-blue hover:text-brand-blue/90 ml-auto"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStepClick(step, isUnlocked, sectionIndex, stepIndex);
                                }}
                              >
                                {step.completed ? "Review" : "Start"}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedLearningPath;
