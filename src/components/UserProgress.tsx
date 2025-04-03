
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Medal, Star, BookOpen, Lightbulb, Target, Zap, Brain, Crown } from "lucide-react";

interface UserProgressProps {
  totalChallenges: number;
  progress: number;
}

const UserProgress: React.FC<UserProgressProps> = ({ totalChallenges, progress }) => {
  // Define learning topics with their status
  const learningTopics = [
    { title: "Programming Basics", icon: <BookOpen className="h-5 w-5 text-blue-500" />, status: progress >= 20 ? "completed" : progress >= 10 ? "in-progress" : "not-started" },
    { title: "Web Development", icon: <Star className="h-5 w-5 text-yellow-500" />, status: progress >= 40 ? "completed" : progress >= 30 ? "in-progress" : "not-started" },
    { title: "Data Structures", icon: <Medal className="h-5 w-5 text-orange-500" />, status: progress >= 60 ? "completed" : progress >= 50 ? "in-progress" : "not-started" },
    { title: "Algorithms", icon: <Award className="h-5 w-5 text-purple-500" />, status: progress >= 80 ? "completed" : progress >= 70 ? "in-progress" : "not-started" },
    { title: "Software Architecture", icon: <Trophy className="h-5 w-5 text-green-500" />, status: progress >= 100 ? "completed" : progress >= 90 ? "in-progress" : "not-started" }
  ];

  // Learning tips based on progress
  const learningTips = [
    { threshold: 0, tip: "Start by asking simple questions to build foundational knowledge." },
    { threshold: 20, tip: "Try breaking down complex problems into smaller parts." },
    { threshold: 40, tip: "Experiment with the solutions provided to deepen your understanding." },
    { threshold: 60, tip: "Challenge yourself by asking about design patterns and best practices." },
    { threshold: 80, tip: "Mentor others by sharing what you've learned and solidify your knowledge." }
  ];

  // Find the most relevant learning tip based on current progress
  const currentTip = learningTips
    .filter(tip => progress >= tip.threshold)
    .pop();

  // Define achievements based on number of questions asked
  const achievements = [
    { 
      title: "First Question", 
      icon: <Zap className="h-4 w-4 text-yellow-600" />, 
      description: "Asked your first learning question", 
      unlocked: totalChallenges >= 1 
    },
    { 
      title: "Curious Mind", 
      icon: <Brain className="h-4 w-4 text-purple-600" />, 
      description: "Asked 5 learning questions", 
      unlocked: totalChallenges >= 5 
    },
    { 
      title: "Knowledge Seeker", 
      icon: <Target className="h-4 w-4 text-blue-600" />, 
      description: "Asked 10 learning questions", 
      unlocked: totalChallenges >= 10 
    },
    { 
      title: "Learning Master", 
      icon: <Crown className="h-4 w-4 text-amber-600" />, 
      description: "Asked 20 learning questions", 
      unlocked: totalChallenges >= 20
    }
  ];

  // Calculate progress milestones
  const milestones = [
    { percentage: 25, title: "Beginner", description: "Completed 25% of the learning path" },
    { percentage: 50, title: "Intermediate", description: "Halfway through your learning journey" },
    { percentage: 75, title: "Advanced", description: "Making excellent progress in your learning" },
    { percentage: 100, title: "Expert", description: "Completed the entire learning path!" }
  ];

  // Get the next milestone
  const nextMilestone = milestones.find(m => progress < m.percentage) || milestones[milestones.length - 1];
  // Get all achieved milestones
  const achievedMilestones = milestones.filter(m => progress >= m.percentage);

  return (
    <div className="space-y-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
            Your Learning Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Learning Path Progress</h3>
            <div className="flex flex-wrap gap-2">
              {learningTopics.map((topic, index) => (
                <Badge 
                  key={index} 
                  variant={topic.status === "completed" ? "success" : topic.status === "in-progress" ? "default" : "outline"} 
                  className="flex items-center gap-1"
                >
                  {topic.icon}
                  {topic.title}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Achievements Section */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Your Achievements</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {achievements.map((achievement, index) => (
                <Badge 
                  key={index} 
                  variant={achievement.unlocked ? "achievement" : "outline"} 
                  className={`flex items-center gap-1 ${!achievement.unlocked && "opacity-50"}`}
                  title={achievement.description}
                >
                  {achievement.icon}
                  {achievement.title}
                </Badge>
              ))}
            </div>
            {achievements.some(a => !a.unlocked) && (
              <p className="text-xs text-gray-500 italic">
                Keep asking questions to unlock more achievements!
              </p>
            )}
          </div>

          {/* Milestones Section */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Learning Milestones</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {achievedMilestones.map((milestone, index) => (
                <Badge 
                  key={index} 
                  variant="milestone" 
                  className="flex items-center gap-1"
                  title={milestone.description}
                >
                  <Trophy className="h-4 w-4 text-indigo-600" />
                  {milestone.title}
                </Badge>
              ))}
            </div>
            {progress < 100 && (
              <p className="text-xs text-gray-500 italic">
                Next milestone: {nextMilestone.title} at {nextMilestone.percentage}% progress
              </p>
            )}
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-blue-100 mr-3">
                <Lightbulb className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium text-blue-800">Learning Tip</h3>
                <p className="text-sm text-blue-700">{currentTip?.tip || "Start your learning journey by asking your first question!"}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Question Ideas to Try</h3>
            <div className="grid grid-cols-1 gap-2">
              <div className="p-2 rounded border border-gray-200 bg-gray-50">
                <p className="text-sm font-medium">How do I implement error handling in JavaScript?</p>
              </div>
              <div className="p-2 rounded border border-gray-200 bg-gray-50">
                <p className="text-sm font-medium">What are React hooks and how do I use them?</p>
              </div>
              <div className="p-2 rounded border border-gray-200 bg-gray-50">
                <p className="text-sm font-medium">Explain the concept of Big O notation in algorithms.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>You've asked {totalChallenges} question{totalChallenges !== 1 ? 's' : ''}!</p>
            <p>Keep learning to advance on your path.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProgress;
