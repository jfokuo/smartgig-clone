
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Sparkles, Brain, Book, Clock, Target, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";

// Mock data for gigs
const featuredGigs = [
  {
    id: 1,
    title: "Interactive Calculus Course",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "Mathematics",
    creator: "Dr. Jane Smith",
    rating: 4.9,
    price: 119.99,
  },
  {
    id: 2,
    title: "AI & Machine Learning Fundamentals",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    category: "Computer Science",
    creator: "Prof. Marcus Chen",
    rating: 4.8,
    price: 149.99,
  },
  {
    id: 3,
    title: "Creative Writing Workshop",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Language Arts",
    creator: "Emily Johnson",
    rating: 4.7,
    price: 89.99,
  },
  {
    id: 4,
    title: "Physics of Everyday Life",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    category: "Science",
    creator: "Dr. Richard Feynman",
    rating: 5.0,
    price: 129.99,
  },
];

const categories = [
  { name: "Mathematics", icon: <Target className="h-10 w-10 text-brand-blue" /> },
  { name: "Computer Science", icon: <Brain className="h-10 w-10 text-brand-blue" /> },
  { name: "Language Arts", icon: <Book className="h-10 w-10 text-brand-blue" /> },
  { name: "Science", icon: <Sparkles className="h-10 w-10 text-brand-blue" /> },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter gigs based on active tab
  const filteredGigs = activeTab === "all" 
    ? featuredGigs 
    : featuredGigs.filter(gig => gig.category.toLowerCase() === activeTab);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-light to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Discover Interactive Educational Experiences
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Find expert educators to create engaging, interactive learning content
              tailored to your needs.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="What do you want to learn?"
                  className="pl-10 py-6 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="bg-brand-blue hover:bg-brand-dark py-6">
                Find Gigs
              </Button>
            </div>
            <div className="text-sm text-gray-500">
              Popular: Math, Science, Programming, Language Arts
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link to={`/gigs?category=${category.name}`} key={index}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-4 rounded-full bg-gray-50">
                      {category.icon}
                    </div>
                    <h3 className="font-medium text-lg mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-500">Browse gigs</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gigs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Gigs</h2>
            <Link to="/gigs" className="text-brand-blue hover:underline flex items-center">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
              <TabsTrigger value="computer science">Computer Science</TabsTrigger>
              <TabsTrigger value="language arts">Language Arts</TabsTrigger>
              <TabsTrigger value="science">Science</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGigs.map((gig) => (
              <Link to={`/gig/${gig.id}`} key={gig.id}>
                <Card className="overflow-hidden hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={gig.image}
                      alt={gig.title}
                      className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4 flex-grow">
                    <div className="text-sm text-brand-blue font-medium mb-1">
                      {gig.category}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {gig.title}
                    </h3>
                    <div className="text-sm text-gray-500 mb-2">
                      By {gig.creator}
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 mr-1">
                        {"★".repeat(Math.floor(gig.rating))}
                      </div>
                      <span className="text-sm text-gray-700">
                        {gig.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="font-bold text-lg">
                      ${gig.price.toFixed(2)}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          {filteredGigs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No gigs found for this category.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setActiveTab("all")}
              >
                View all gigs
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">How SmartGig Works</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Our platform connects educators with learners to create engaging, interactive educational experiences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/gigs" className="group">
              <div className="text-center transition-transform transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-brand-light group-hover:bg-brand-blue/20">
                    <Search className="h-8 w-8 text-brand-blue" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Find</h3>
                <p className="text-gray-600">
                  Browse our marketplace of expert educators and find the perfect match for your learning needs.
                </p>
              </div>
            </Link>

            <Link to="/gigs" className="group">
              <div className="text-center transition-transform transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-brand-light group-hover:bg-brand-blue/20">
                    <Brain className="h-8 w-8 text-brand-blue" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Connect</h3>
                <p className="text-gray-600">
                  Communicate directly with educators to discuss your specific requirements and goals.
                </p>
              </div>
            </Link>

            <Link to="/ai-path" className="group">
              <div className="text-center transition-transform transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-brand-light group-hover:bg-brand-blue/20">
                    <Sparkles className="h-8 w-8 text-brand-blue" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Learn</h3>
                <p className="text-gray-600">
                  Enjoy interactive, engaging educational content tailored specifically to your learning style.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Feature Highlight */}
      <section className="py-16 bg-gradient-to-r from-brand-dark to-brand-blue text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">
                AI-Powered Learning Paths
              </h2>
              <p className="text-lg mb-6 text-gray-100">
                Our AI analyzes your interests, learning style, and goals to create personalized learning paths that adapt as you progress.
              </p>
              <Button className="bg-white text-brand-dark hover:bg-gray-100" asChild>
                <Link to="/ai-path">
                  Try AI Learning Paths
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="AI Learning" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
