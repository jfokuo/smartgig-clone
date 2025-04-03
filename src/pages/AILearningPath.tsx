
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

const AILearningPath = () => {
  const [question, setQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalChallenges, setTotalChallenges] = useState(0);
  const { toast } = useToast();

  // Load user progress on component mount
  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching user progress:", error);
      }
    };

    fetchUserProgress();
  }, []);

  const handleGenerateSolution = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("generate-ai-content", {
        body: { prompt: question },
      });
      
      if (error) throw error;
      
      setAiResponse(data.content);

      // Save the question to Supabase
      const { error: saveError } = await supabase
        .from('AI project')
        .insert({ content: question });

      if (saveError) throw saveError;

      // Update progress
      setTotalChallenges(prev => prev + 1);
      // Each question is worth 5% progress, max 100%
      const newProgress = Math.min((totalChallenges + 1) * 5, 100);
      setProgress(newProgress);

    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Generation failed",
        description: "Failed to generate AI solution. Please try again.",
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

          {/* User Progress Component */}
          <UserProgress 
            totalChallenges={totalChallenges} 
            progress={progress}
          />

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
