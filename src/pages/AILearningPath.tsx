
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Brain, 
  Sparkles, 
  Target, 
  Clock, 
  Book, 
  CheckCircle,
  ChevronRight,
  HelpCircle,
  BookOpen,
  Code,
  Lightbulb
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Mock data for learning paths with problem-solving focus
const mockLearningPaths = [
  {
    id: 1,
    title: "Debugging & Troubleshooting Mastery",
    description: "Master the art of finding and fixing bugs efficiently. Learn systematic approaches to problem-solving in software development.",
    duration: "6 weeks",
    level: "Intermediate",
    pathType: "problem-solving",
    steps: [
      {
        title: "Error Analysis Fundamentals",
        gigId: 1,
        gigTitle: "Understanding Error Messages",
      },
      {
        title: "Systematic Debugging Techniques",
        gigId: 2,
        gigTitle: "Scientific Method for Debugging",
      },
      {
        title: "Advanced Debugging Tools",
        gigId: 3,
        gigTitle: "Mastering Developer Tools",
      },
      {
        title: "Performance Problem Solving",
        gigId: 4,
        gigTitle: "Identifying & Fixing Bottlenecks",
      },
    ],
  },
  {
    id: 2,
    title: "Practical Problem-Solving in Web Development",
    description: "Learn to approach real-world development challenges with confidence. Build a toolkit of strategies for solving common and complex problems.",
    duration: "8 weeks",
    level: "All Levels",
    pathType: "problem-solving",
    steps: [
      {
        title: "Solution Architecture Basics",
        gigId: 5,
        gigTitle: "Breaking Down Complex Problems",
      },
      {
        title: "Common Web Development Challenges",
        gigId: 6,
        gigTitle: "Solutions to Everyday Problems",
      },
      {
        title: "User-Centered Problem Solving",
        gigId: 7,
        gigTitle: "Addressing User Needs & Pain Points",
      },
      {
        title: "Testing & Validation Strategies",
        gigId: 8,
        gigTitle: "Verifying Your Solutions Work",
      },
    ],
  },
];

const AILearningPath = () => {
  const [challenge, setChallenge] = useState("");
  const [level, setLevel] = useState("beginner");
  const [learningStyle, setLearningStyle] = useState("practical");
  const [goalType, setGoalType] = useState("problem");
  const [generatedPaths, setGeneratedPaths] = useState<typeof mockLearningPaths>([]);
  const [aiResponse, setAiResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGeneratePath = () => {
    setIsGenerating(true);
    
    // Generate learning path and practical solution
    setTimeout(async () => {
      try {
        // First, set the mock paths for the UI
        setGeneratedPaths(mockLearningPaths);
        
        // Then call the edge function to get a solution-oriented response
        if (challenge) {
          const { data, error } = await supabase.functions.invoke("generate-ai-content", {
            body: { prompt: challenge },
          });
          
          if (error) throw error;
          
          setAiResponse(data.content);
        }
      } catch (error) {
        console.error("Error generating content:", error);
        toast({
          title: "Generation failed",
          description: "Failed to generate AI content. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsGenerating(false);
      }
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">AI Problem Solver</h1>
            <p className="text-lg text-gray-600">
              Describe your challenge, and get a simple solution.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="p-5">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleGeneratePath();
              }}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="challenge" className="text-lg font-medium">
                      What problem are you trying to solve?
                    </Label>
                    <Textarea
                      id="challenge"
                      placeholder="Describe your challenge, error, or question..."
                      className="mt-2"
                      value={challenge}
                      onChange={(e) => setChallenge(e.target.value)}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-5 bg-brand-blue hover:bg-brand-dark"
                    disabled={isGenerating || !challenge.trim()}
                  >
                    {isGenerating ? (
                      <>Analyzing Your Challenge...</>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate Solution
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
                  <h2 className="text-xl font-bold">Solution</h2>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                  {aiResponse}
                </div>
              </CardContent>
            </Card>
          )}

          {generatedPaths.length > 0 && (
            <>
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-3 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-brand-blue" />
                  Recommended Resources
                </h2>
              </div>

              <div className="space-y-4">
                {generatedPaths.map((path) => (
                  <Card key={path.id} className="hover:border-brand-blue transition-all">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold mb-1">{path.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{path.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {path.duration}
                        </div>
                        <div className="flex items-center">
                          <Target className="h-3 w-3 mr-1" />
                          {path.level}
                        </div>
                      </div>

                      <Button className="w-full bg-brand-blue hover:bg-brand-dark text-sm py-1 h-8">
                        Start Learning
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AILearningPath;
