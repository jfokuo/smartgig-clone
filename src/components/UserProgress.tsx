
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Medal, Star, BookOpen } from "lucide-react";

interface UserProgressProps {
  totalChallenges: number;
  progress: number;
}

const UserProgress: React.FC<UserProgressProps> = ({ totalChallenges, progress }) => {
  // Define milestones based on progress
  const milestones = [
    { threshold: 5, title: "First Step", icon: <BookOpen className="h-5 w-5 text-blue-500" />, unlocked: progress >= 5 },
    { threshold: 25, title: "Knowledge Seeker", icon: <Star className="h-5 w-5 text-yellow-500" />, unlocked: progress >= 25 },
    { threshold: 50, title: "Half Way There", icon: <Medal className="h-5 w-5 text-orange-500" />, unlocked: progress >= 50 },
    { threshold: 75, title: "Almost There", icon: <Award className="h-5 w-5 text-purple-500" />, unlocked: progress >= 75 },
    { threshold: 100, title: "Learning Master", icon: <Trophy className="h-5 w-5 text-green-500" />, unlocked: progress >= 100 }
  ];

  // Calculate special awards based on number of challenges
  const awards = [
    { threshold: 1, title: "First Challenge", description: "Completed your first challenge", icon: <Star className="h-5 w-5" />, unlocked: totalChallenges >= 1 },
    { threshold: 5, title: "Curious Mind", description: "Completed 5 challenges", icon: <BookOpen className="h-5 w-5" />, unlocked: totalChallenges >= 5 },
    { threshold: 10, title: "Knowledge Explorer", description: "Completed 10 challenges", icon: <Medal className="h-5 w-5" />, unlocked: totalChallenges >= 10 },
    { threshold: 20, title: "Learning Enthusiast", description: "Completed 20 challenges", icon: <Award className="h-5 w-5" />, unlocked: totalChallenges >= 20 },
    { threshold: 50, title: "Smart Genius", description: "Completed 50 challenges", icon: <Trophy className="h-5 w-5" />, unlocked: totalChallenges >= 50 }
  ];

  return (
    <div className="space-y-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
            Your Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Progress Milestones</h3>
            <div className="flex flex-wrap gap-2">
              {milestones.map((milestone, index) => (
                <Badge 
                  key={index} 
                  variant={milestone.unlocked ? "default" : "outline"} 
                  className={`flex items-center gap-1 ${milestone.unlocked ? 'bg-green-100 text-green-800' : 'text-gray-400'}`}
                >
                  {milestone.icon}
                  {milestone.title}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Special Awards</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {awards.map((award, index) => (
                <div 
                  key={index} 
                  className={`p-2 rounded border ${award.unlocked ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50 opacity-50'}`}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${award.unlocked ? 'bg-green-100' : 'bg-gray-100'}`}>
                      {award.icon}
                    </div>
                    <div className="ml-2">
                      <p className="font-medium text-sm">{award.title}</p>
                      <p className="text-xs text-gray-500">{award.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>You've completed {totalChallenges} challenge{totalChallenges !== 1 ? 's' : ''}!</p>
            <p>Keep learning to unlock more achievements.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProgress;
