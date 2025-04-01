
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Calendar, User, FileText } from "lucide-react";

const Press = () => {
  const pressReleases = [
    {
      id: 1,
      title: "SmartGig Raises $15M to Expand Interactive Educational Platform",
      date: "August 15, 2023",
      summary: "Funding will support global expansion and enhanced AI learning features.",
    },
    {
      id: 2,
      title: "SmartGig Launches AI-Powered Learning Paths for Personalized Education",
      date: "May 22, 2023",
      summary: "New feature uses machine learning to create custom learning experiences.",
    },
    {
      id: 3,
      title: "SmartGig Reaches Milestone of 10,000 Educators and 150,000 Learners",
      date: "January 10, 2023",
      summary: "Platform growth reflects increasing demand for personalized education.",
    },
  ];

  const mediaFeatures = [
    {
      id: 1,
      source: "TechCrunch",
      title: "SmartGig Is Revolutionizing How We Learn Online",
      date: "September 2, 2023",
      url: "#",
      logo: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png",
    },
    {
      id: 2,
      source: "Forbes",
      title: "The Future of Education: How SmartGig Creates Personalized Learning",
      date: "July 18, 2023",
      url: "#",
      logo: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png",
    },
    {
      id: 3,
      source: "Education Weekly",
      title: "How AI Is Transforming Education Through Platforms Like SmartGig",
      date: "April 5, 2023",
      url: "#",
      logo: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Press & Media</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay up to date with the latest news, announcements, and media coverage of SmartGig.
          </p>
        </div>
        
        {/* Media Contact */}
        <div className="bg-gray-50 p-6 rounded-lg mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Media Contact</h2>
              <p className="text-gray-600 mb-4">
                For press inquiries, interview requests, or additional information about SmartGig, please contact our media relations team.
              </p>
              <div className="space-y-1">
                <p className="font-medium">Media Relations</p>
                <p className="text-brand-blue">press@smartgig.com</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <Button className="bg-brand-blue hover:bg-brand-dark">
                Download Press Kit
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Press Releases */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Press Releases</h2>
          
          <div className="space-y-6">
            {pressReleases.map((release) => (
              <Card key={release.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{release.title}</CardTitle>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {release.date}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{release.summary}</p>
                  <Button variant="link" className="p-0 h-auto text-brand-blue hover:text-brand-dark">
                    Read Full Release
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Button variant="outline">View All Press Releases</Button>
          </div>
        </div>
        
        {/* In The News */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">SmartGig In The News</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaFeatures.map((feature) => (
              <Card key={feature.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{feature.source}</CardTitle>
                  <CardDescription className="flex items-center text-sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    {feature.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-medium mb-4">{feature.title}</p>
                  <Button variant="link" className="p-0 h-auto text-brand-blue hover:text-brand-dark">
                    Read Article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Company Facts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Company Facts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 text-brand-blue" size={20} />
                  About SmartGig
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li><span className="font-medium">Founded:</span> 2020</li>
                  <li><span className="font-medium">Headquarters:</span> New York, NY</li>
                  <li><span className="font-medium">Leadership:</span> Dr. Sarah Johnson (Founder & CEO)</li>
                  <li><span className="font-medium">Employees:</span> 120+ across 15 countries</li>
                  <li><span className="font-medium">Funding:</span> $22M in venture funding</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 text-brand-blue" size={20} />
                  Platform Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li><span className="font-medium">Educators:</span> 10,000+ from 75+ countries</li>
                  <li><span className="font-medium">Learners:</span> 150,000+ from 150+ countries</li>
                  <li><span className="font-medium">Educational Gigs:</span> 15,000+</li>
                  <li><span className="font-medium">Subject Areas:</span> 120+ across all disciplines</li>
                  <li><span className="font-medium">Learning Hours:</span> 2.5M+ delivered to date</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Brand Assets */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Brand Assets</h2>
          <p className="text-gray-600 mb-6">
            Download official SmartGig logos, product screenshots, and executive headshots for media use.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-brand-blue hover:bg-brand-dark">
              <Download className="mr-2 h-4 w-4" />
              Logo Pack
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Product Screenshots
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Executive Photos
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Press;
