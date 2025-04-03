
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Lightbulb,
  Sparkles,
  Award,
  Brain
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import UserProgress from "@/components/UserProgress";
import LearningGoalSelector from "@/components/LearningGoalSelector";
import RecommendedLearningPath from "@/components/RecommendedLearningPath";
import { generateLearningPathForGoal, LearningPathSection } from "@/utils/learning-paths";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";

const AILearningPath = () => {
  const [question, setQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalChallenges, setTotalChallenges] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [learningPath, setLearningPath] = useState<LearningPathSection[]>([]);
  const [selectedStep, setSelectedStep] = useState<{id: string, title: string} | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access the AI learning path.",
        variant: "destructive",
      });
      navigate("/auth");
    }
  }, [user, navigate, toast]);

  // Load user progress, learning goal, and saved query on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch projects to calculate progress
        const { data, error } = await supabase
          .from('AI project')
          .select('*')
          .order('id', { ascending: false });
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setTotalChallenges(data.length);
          // Calculate progress - each question is worth 5% progress, max 100%
          const newProgress = Math.min(data.length * 5, 100);
          setProgress(newProgress);
        }
        
        // Try to get saved learning goal from localStorage
        const savedGoal = localStorage.getItem('learning_goal');
        if (savedGoal) {
          setSelectedGoal(savedGoal);
          // Generate learning path based on saved goal
          const generatedPath = generateLearningPathForGoal(savedGoal, data?.length || 0);
          setLearningPath(generatedPath);
        }

        // Check if there's a saved learning query
        const savedQuery = localStorage.getItem('learning_query');
        if (savedQuery) {
          setQuestion(savedQuery);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleGoalSelection = (goalId: string) => {
    setSelectedGoal(goalId);
    // Save selected goal to localStorage
    localStorage.setItem('learning_goal', goalId);
    // Generate learning path for the selected goal
    const generatedPath = generateLearningPathForGoal(goalId, totalChallenges);
    setLearningPath(generatedPath);
  };

  const handleStepSelection = (stepId: string, title: string) => {
    setSelectedStep({id: stepId, title: title});
    toast({
      title: "Learning path step selected",
      description: `You've selected "${title}" - The form below has been pre-filled for you.`,
      variant: "info"
    });
  };

  const handleGenerateSolution = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // Generate AI content using Supabase Edge Function
      const { data: aiData, error: aiError } = await supabase.functions.invoke("generate-ai-content", {
        body: { prompt: question },
      });
      
      if (aiError) throw aiError;
      
      setAiResponse(aiData.content);

      // Save the question to Supabase
      const { error: saveError } = await supabase
        .from('AI project')
        .insert({ content: question });

      if (saveError) {
        console.error("Error saving to AI project:", saveError);
        throw saveError;
      }

      // Update progress
      setTotalChallenges(prev => prev + 1);
      // Each question is worth 5% progress, max 100%
      const newProgress = Math.min((totalChallenges + 1) * 5, 100);
      setProgress(newProgress);
      
      // Update learning path if a goal is selected
      if (selectedGoal) {
        const updatedPath = generateLearningPathForGoal(selectedGoal, totalChallenges + 1);
        setLearningPath(updatedPath);
      }

      // Clear the stored query after successful generation
      localStorage.removeItem('learning_query');

      toast({
        title: "Learning content generated",
        description: "Your personalized learning content has been created successfully.",
      });

    } catch (error: any) {
      console.error("Error generating content:", error);
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate AI solution. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">AI Learning Assistant</h1>
            <p className="text-lg text-gray-600 mb-4">
              Ask questions and get personalized learning solutions
            </p>
            
            {/* Progress tracking */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Learning Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Learning Goal Selector */}
          <LearningGoalSelector 
            onSelectGoal={handleGoalSelection} 
            selectedGoalId={selectedGoal} 
          />

          {/* Personalized Learning Path */}
          <RecommendedLearningPath 
            goalId={selectedGoal}
            learningPath={learningPath}
            currentProgress={progress}
            onSelectStep={handleStepSelection}
          />

          {/* User Progress Component */}
          <UserProgress 
            totalChallenges={totalChallenges} 
            progress={progress}
          />

          {selectedStep && (
            <div className="mb-4">
              <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-lg p-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-brand-blue" />
                  Currently Learning: {selectedStep.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Submit your question below to get detailed learning content on this topic.
                </p>
              </div>
            </div>
          )}

          <Card className="mb-6">
            <CardContent className="p-5">
              <form onSubmit={handleGenerateSolution}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="question" className="text-lg font-medium">
                      What would you like to learn today?
                    </Label>
                    <Textarea
                      id="question"
                      placeholder="Ask any coding question, request a code explanation, or explore a new concept..."
                      className="mt-2 min-h-[120px]"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-5 bg-brand-blue hover:bg-brand-dark"
                    disabled={isGenerating || !question.trim()}
                  >
                    {isGenerating ? (
                      <>Generating Learning Content...</>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate Learning Content
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {aiResponse && (
            <Card className="mb-6 border-2 border-green-100">
              <CardContent className="p-5">
                <div className="flex items-center mb-2">
                  <Lightbulb className="h-5 w-5 text-brand-blue mr-2" />
                  <h2 className="text-xl font-bold">Learning Content</h2>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap markdown-content">
                  {aiResponse.split('\n').map((line, index) => {
                    if (line.startsWith('# ')) {
                      return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{line.replace('# ', '')}</h2>;
                    } else if (line.startsWith('## ')) {
                      return <h3 key={index} className="text-lg font-semibold mt-3 mb-1">{line.replace('## ', '')}</h3>;
                    } else if (line.startsWith('- ')) {
                      return <li key={index} className="ml-4 list-disc">{line.replace('- ', '')}</li>;
                    } else if (line.match(/^\d+\. /)) {
                      return <li key={index} className="ml-4 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
                    } else if (line === '') {
                      return <br key={index} />;
                    } else {
                      return <p key={index} className="my-1">{line}</p>;
                    }
                  })}
                </div>
                <div className="mt-4 text-right">
                  <Button variant="outline" size="sm" onClick={() => setAiResponse("")}>
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="text-center text-gray-500 text-sm mt-8">
            <p>Ask anything related to programming, development, or technical concepts.</p>
            <p>Our AI Learning Assistant helps you understand complex topics through personalized explanations.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AILearningPath;
