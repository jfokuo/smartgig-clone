
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AIProject, fetchUserProjects, createProject, deleteProject } from "@/utils/ai-projects";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Projects = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ["ai-projects"],
    queryFn: fetchUserProjects,
    enabled: !!user,
  });

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-projects"] });
      toast({
        title: "Project created",
        description: "Your AI project has been saved successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create project",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-projects"] });
      toast({
        title: "Project deleted",
        description: "Your AI project has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete project",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleGenerateContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a prompt to generate content.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-ai-content", {
        body: { prompt: prompt.trim() },
      });

      if (error) throw error;

      createProjectMutation.mutate(data.content);
      setPrompt("");
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
  };

  if (error) {
    return (
      <Layout>
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-4">AI Projects</h1>
          <div className="bg-red-50 p-4 rounded-md text-red-800">
            Error loading projects: {error.message}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your AI Projects</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generate New Content</CardTitle>
            <CardDescription>
              Enter a prompt and our AI will generate content for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a prompt for the AI..."
                className="flex-1"
              />
              <Button 
                onClick={handleGenerateContent} 
                disabled={isGenerating || !prompt.trim()}
              >
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse">Loading your projects...</div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-700">No projects yet</h3>
            <p className="text-gray-500 mt-2">
              Generate your first AI content by entering a prompt above.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardContent className="pt-6">
                  <p className="whitespace-pre-wrap">{project.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-4">
                  <div className="text-sm text-gray-500">
                    Project #{project.id}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteProjectMutation.mutate(project.id)}
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Projects;
