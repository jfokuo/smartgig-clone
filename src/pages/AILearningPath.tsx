
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
  ChevronRight 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

// Mock data for learning paths
const mockLearningPaths = [
  {
    id: 1,
    title: "Data Science Fundamentals",
    description: "Master the essentials of data science from statistics to machine learning algorithms.",
    duration: "12 weeks",
    level: "Beginner",
    steps: [
      {
        title: "Introduction to Statistics",
        gigId: 1,
        gigTitle: "Statistics Essentials",
      },
      {
        title: "Python for Data Analysis",
        gigId: 2,
        gigTitle: "Python Data Science Toolkit",
      },
      {
        title: "Machine Learning Basics",
        gigId: 3,
        gigTitle: "Introduction to Machine Learning",
      },
    ],
  },
  {
    id: 2,
    title: "Web Development Journey",
    description: "Learn full-stack web development from HTML basics to advanced React applications.",
    duration: "16 weeks",
    level: "Intermediate",
    steps: [
      {
        title: "HTML & CSS Mastery",
        gigId: 4,
        gigTitle: "Modern HTML and CSS",
      },
      {
        title: "JavaScript Essentials",
        gigId: 5,
        gigTitle: "JavaScript from Zero to Hero",
      },
      {
        title: "React Framework",
        gigId: 6,
        gigTitle: "React Application Development",
      },
      {
        title: "Backend with Node.js",
        gigId: 7,
        gigTitle: "Building RESTful APIs with Node.js",
      },
    ],
  },
];

const AILearningPath = () => {
  const [interests, setInterests] = useState("");
  const [level, setLevel] = useState("beginner");
  const [timeCommitment, setTimeCommitment] = useState("medium");
  const [goals, setGoals] = useState("");
  const [generatedPaths, setGeneratedPaths] = useState<typeof mockLearningPaths>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePath = () => {
    setIsGenerating(true);
    
    // Simulate AI path generation
    setTimeout(() => {
      setGeneratedPaths(mockLearningPaths);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">AI Learning Path Generator</h1>
            <p className="text-xl text-gray-600 mb-6">
              Tell us what you want to learn, and our AI will create a personalized learning path just for you.
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
                    <Label htmlFor="interests" className="text-lg font-medium">
                      What do you want to learn?
                    </Label>
                    <Textarea
                      id="interests"
                      placeholder="E.g., Data science, web development, digital marketing..."
                      className="mt-2"
                      value={interests}
                      onChange={(e) => setInterests(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="level" className="text-lg font-medium">
                        Your experience level
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
                      <Label htmlFor="time" className="text-lg font-medium">
                        Time commitment
                      </Label>
                      <Select value={timeCommitment} onValueChange={setTimeCommitment}>
                        <SelectTrigger id="time" className="mt-2">
                          <SelectValue placeholder="Select time commitment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low (2-4 hours/week)</SelectItem>
                          <SelectItem value="medium">Medium (5-10 hours/week)</SelectItem>
                          <SelectItem value="high">High (10+ hours/week)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="goals" className="text-lg font-medium">
                      Your learning goals
                    </Label>
                    <Textarea
                      id="goals"
                      placeholder="E.g., Career change, skill enhancement, personal project..."
                      className="mt-2"
                      value={goals}
                      onChange={(e) => setGoals(e.target.value)}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-6 bg-brand-blue hover:bg-brand-dark"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>Generating Your Path...</>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate Learning Path
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {generatedPaths.length > 0 && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Your Personalized Learning Paths</h2>
                <p className="text-gray-600 mb-6">
                  Based on your interests and goals, our AI has generated these learning paths for you.
                  Each path is carefully curated with a sequence of courses to help you achieve your learning objectives.
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
                            {path.steps.length} courses
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
                          <span className="text-sm">AI-optimized path</span>
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
