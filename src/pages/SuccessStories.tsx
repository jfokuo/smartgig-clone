
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

// Mock success stories data
const storiesData = {
  educators: [
    {
      id: 1,
      name: "Dr. Marcus Chen",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      title: "Computer Science Professor",
      story: "After years of teaching in a traditional classroom, I decided to create interactive programming courses on SmartGig. Within six months, I've reached over 1,500 students worldwide and increased my income by 40%.",
      achievements: "Created 4 bestselling courses, Average rating of 4.8/5",
    },
    {
      id: 2,
      name: "Emily Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      title: "Creative Writing Coach",
      story: "SmartGig has transformed my teaching career. I can now connect with aspiring writers from all over the world, creating personalized workshops that truly meet their needs.",
      achievements: "Featured educator of the month, 98% student satisfaction rate",
    },
  ],
  learners: [
    {
      id: 1,
      name: "Michael Peters",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      title: "Software Developer",
      story: "I struggled with advanced calculus concepts until I found Dr. Smith's interactive course on SmartGig. The personalized approach and practical examples helped me master complex topics in just weeks.",
      achievements: "Improved GPA from 2.8 to 3.9, Secured dream internship at tech company",
    },
    {
      id: 2,
      name: "Sarah Kim",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      title: "High School Student",
      story: "The AI Learning Path recommended the perfect physics course for me based on my learning style. The interactive simulations made complex concepts so much easier to understand.",
      achievements: "Received scholarship for science achievement, Started tutoring other students",
    },
  ],
};

const SuccessStories = () => {
  const { type = "educators" } = useParams();
  const stories = type === "learners" ? storiesData.learners : storiesData.educators;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Success Stories</h1>
        <p className="text-gray-600 mb-8">
          {type === "learners" 
            ? "Discover how learners have transformed their educational journey with SmartGig." 
            : "Learn how educators have expanded their reach and impact through SmartGig."}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map(story => (
            <Card key={story.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar className="h-16 w-16 border-2 border-brand-light">
                    <AvatarImage src={story.avatar} alt={story.name} />
                    <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-xl">{story.name}</h3>
                    <p className="text-gray-600">{story.title}</p>
                    <div className="flex text-yellow-400 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400" />
                    </div>
                  </div>
                </div>
                
                <blockquote className="border-l-4 border-brand-blue pl-4 italic mb-4">
                  "{story.story}"
                </blockquote>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="font-medium text-sm text-gray-700 mb-1">Achievements:</h4>
                  <p className="text-sm text-gray-600">{story.achievements}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SuccessStories;
