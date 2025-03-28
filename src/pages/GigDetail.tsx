import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Star, CheckCircle, MessageSquare, Clock, Award, Share2, Heart, AlertCircle, Users } from "lucide-react";

// Mock data for gig details
const gigDetails = {
  id: 1,
  title: "Interactive Calculus Course",
  description: "A comprehensive, interactive calculus course designed for high school and early college students. This engaging learning experience combines visual demonstrations, practice problems, and real-world applications.",
  image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  category: "Mathematics",
  creator: {
    name: "Dr. Jane Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    title: "Ph.D in Mathematics, Stanford University",
    rating: 4.9,
    reviews: 128,
    students: 1432,
  },
  rating: 4.9,
  reviews: 87,
  price: 119.99,
  duration: "8 weeks",
  level: "Intermediate",
  language: "English",
  lastUpdated: "September 2023",
  features: [
    "Interactive simulations",
    "Weekly live sessions",
    "Personalized feedback",
    "Certificate of completion",
    "Lifetime access to materials",
    "Mobile-friendly learning",
  ],
  curriculum: [
    {
      title: "Week 1: Introduction to Limits",
      description: "Understanding the fundamental concept of limits and their applications.",
      duration: "3 hours",
    },
    {
      title: "Week 2: Derivatives and Rates of Change",
      description: "Exploring derivatives as rates of change and their geometric interpretation.",
      duration: "4 hours",
    },
    {
      title: "Week 3: Applications of Derivatives",
      description: "Using derivatives to solve optimization problems and analyze functions.",
      duration: "5 hours",
    },
    {
      title: "Week 4: Integration Techniques",
      description: "Mastering various integration methods including substitution and by parts.",
      duration: "5 hours",
    },
  ],
  reviews: [
    {
      id: 1,
      user: "Michael P.",
      rating: 5,
      date: "October 12, 2023",
      comment: "Dr. Smith's approach to teaching calculus transformed my understanding of the subject. The interactive simulations made abstract concepts concrete and easy to grasp.",
    },
    {
      id: 2,
      user: "Sarah K.",
      rating: 4,
      date: "September 27, 2023",
      comment: "Excellent course overall. The weekly live sessions were particularly helpful for addressing questions. Would have liked more practice problems.",
    },
  ],
};

const GigDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  
  // In a real app, we would fetch the gig details based on the ID
  // For now, we'll use our mock data
  const gig = gigDetails;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{gig.title}</h1>
            
            <div className="flex items-center flex-wrap gap-3 mb-6">
              <div className="flex items-center">
                <Star className="fill-yellow-400 stroke-yellow-400 w-5 h-5" />
                <span className="ml-1 font-medium">{gig.rating}</span>
                <span className="text-gray-500 ml-1">({gig.reviews} reviews)</span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-gray-700">{gig.level} level</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-700">{gig.language}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-700">Last updated {gig.lastUpdated}</span>
            </div>
            
            <div className="rounded-lg overflow-hidden mb-8">
              <img 
                src={gig.image} 
                alt={gig.title} 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">About This Course</h2>
                <p className="text-gray-700 mb-6">{gig.description}</p>
                
                <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {gig.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Course Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-500 mr-2" />
                    <div>
                      <span className="text-gray-500">Duration</span>
                      <p className="font-medium">{gig.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-gray-500 mr-2" />
                    <div>
                      <span className="text-gray-500">Certificate</span>
                      <p className="font-medium">Yes, upon completion</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="curriculum" className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Course Curriculum</h2>
                
                <div className="space-y-4">
                  {gig.curriculum.map((week, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{week.title}</h3>
                            <p className="text-gray-600 mt-1">{week.description}</p>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {week.duration}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="instructor" className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">About the Instructor</h2>
                
                <div className="flex items-start gap-4 mb-6">
                  <img 
                    src={gig.creator.avatar} 
                    alt={gig.creator.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{gig.creator.name}</h3>
                    <p className="text-gray-600">{gig.creator.title}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center">
                        <Star className="fill-yellow-400 stroke-yellow-400 w-4 h-4" />
                        <span className="ml-1">{gig.creator.rating} Instructor Rating</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="w-4 h-4 text-gray-500 mr-1" />
                        <span>{gig.creator.reviews} Reviews</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-gray-500 mr-1" />
                        <span>{gig.creator.students} Students</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">
                  Dr. Jane Smith is a passionate mathematics educator with over 15 years of experience teaching at both high school and university levels. She specializes in making complex mathematical concepts accessible and engaging for students of all backgrounds.
                </p>
                <p className="text-gray-700">
                  Dr. Smith holds a Ph.D. in Mathematics from Stanford University and has published numerous papers on mathematics education. Her teaching philosophy centers on interactive learning experiences that connect abstract concepts to real-world applications.
                </p>
              </TabsContent>
              
              <TabsContent value="reviews" className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Student Reviews</h2>
                  <div className="flex items-center">
                    <Star className="fill-yellow-400 stroke-yellow-400 w-5 h-5" />
                    <span className="ml-1 font-medium text-lg">{gig.rating}</span>
                    <span className="text-gray-500 ml-1">({gig.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {gig.reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-gray-200 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{review.user}</div>
                        <div className="flex items-center">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 stroke-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="text-3xl font-bold mb-4">${gig.price.toFixed(2)}</div>
                
                <Button className="w-full mb-4 py-6 bg-brand-blue hover:bg-brand-dark">
                  Enroll Now
                </Button>
                
                <div className="flex justify-center gap-2 mb-6">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="w-4 h-4 mr-1" />
                    Wishlist
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
                
                <div className="text-sm text-gray-500 mb-6 text-center">
                  30-Day Money-Back Guarantee
                </div>
                
                <h3 className="font-semibold mb-3">This course includes:</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>{gig.duration} of on-demand content</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Interactive practice exercises</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Full lifetime access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Certificate of completion</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Access on mobile and desktop</span>
                  </li>
                </ul>
                
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    Not sure if this course is right for you? Contact the instructor to discuss your specific learning needs.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GigDetail;
