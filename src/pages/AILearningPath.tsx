
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">AI Problem-Solving Assistant</h1>
            <p className="text-xl text-gray-600 mb-6">
              Describe your challenge, and our AI will help with practical solutions and learning resources.
            </p>
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-brand-light">
                <Brain className="h-10 w-10 text-brand-blue" />
              </div>
            </div>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleGeneratePath();
              }}>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="challenge" className="text-lg font-medium flex items-center">
                      <HelpCircle className="h-5 w-5 mr-2 text-brand-blue" />
                      What problem are you trying to solve?
                    </Label>
                    <Textarea
                      id="challenge"
                      placeholder="Describe your challenge, error, or topic you need help with..."
                      className="mt-2"
                      value={challenge}
                      onChange={(e) => setChallenge(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="level" className="text-lg font-medium flex items-center">
                        <Target className="h-5 w-5 mr-2 text-brand-blue" />
                        Your expertise level
                      </Label>
                      <Select value={level} onValueChange={setLevel}>
                        <SelectTrigger id="level" className="mt-2">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="style" className="text-lg font-medium flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-brand-blue" />
                        Learning style
                      </Label>
                      <Select value={learningStyle} onValueChange={setLearningStyle}>
                        <SelectTrigger id="style" className="mt-2">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="practical">Practical (code examples)</SelectItem>
                          <SelectItem value="conceptual">Conceptual (theory first)</SelectItem>
                          <SelectItem value="visual">Visual (diagrams & visuals)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="goal" className="text-lg font-medium flex items-center">
                        <Lightbulb className="h-5 w-5 mr-2 text-brand-blue" />
                        Goal type
                      </Label>
                      <Select value={goalType} onValueChange={setGoalType}>
                        <SelectTrigger id="goal" className="mt-2">
                          <SelectValue placeholder="Select goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="problem">Fix a specific problem</SelectItem>
                          <SelectItem value="learn">Learn a new concept</SelectItem>
                          <SelectItem value="build">Build a new feature</SelectItem>
                          <SelectItem value="optimize">Optimize existing code</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-6 bg-brand-blue hover:bg-brand-dark"
                    disabled={isGenerating || !challenge.trim()}
                  >
                    {isGenerating ? (
                      <>Analyzing Your Challenge...</>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate Solutions
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {aiResponse && (
            <Card className="mb-8 border-2 border-green-100">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Code className="h-6 w-6 text-brand-blue mr-2" />
                  <h2 className="text-2xl font-bold">Practical Solution</h2>
                </div>
                <div className="bg-gray-50 p-5 rounded-lg mb-4">
                  <pre className="whitespace-pre-wrap text-sm font-mono">{aiResponse}</pre>
                </div>
                <p className="text-sm text-gray-500 italic">
                  This solution is generated based on your specific challenge and expertise level.
                </p>
              </CardContent>
            </Card>
          )}

          {generatedPaths.length > 0 && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <BookOpen className="h-6 w-6 mr-2 text-brand-blue" />
                  Recommended Learning Resources
                </h2>
                <p className="text-gray-600 mb-6">
                  Based on your challenge, here are curated learning paths to help you build relevant skills and knowledge.
                </p>
              </div>

              <div className="space-y-8">
                {generatedPaths.map((path) => (
                  <Card key={path.id} className="border-2 border-brand-light hover:border-brand-blue transition-all">
                    <CardContent className="p-6">
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold mb-2">{path.title}</h3>
                        <p className="text-gray-600 mb-4">{path.description}</p>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            {path.duration}
                          </div>
                          <div className="flex items-center text-sm">
                            <Target className="h-4 w-4 mr-1" />
                            {path.level} level
                          </div>
                          <div className="flex items-center text-sm">
                            <Book className="h-4 w-4 mr-1" />
                            {path.steps.length} modules
                          </div>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-4 mb-6">
                        <h4 className="font-semibold text-lg">Learning Journey</h4>
                        {path.steps.map((step, index) => (
                          <div key={index} className="flex items-start">
                            <div className="bg-brand-blue text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                              {index + 1}
                            </div>
                            <div>
                              <h5 className="font-medium mb-1">{step.title}</h5>
                              <Link 
                                to={`/gig/${step.gigId}`} 
                                className="text-brand-blue hover:underline text-sm flex items-center"
                              >
                                {step.gigTitle} <ChevronRight className="h-3 w-3 ml-1" />
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          <span className="text-sm">AI-optimized for your challenge</span>
                        </div>
                        <Button className="bg-brand-blue hover:bg-brand-dark">
                          Start This Path
                        </Button>
                      </div>
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
