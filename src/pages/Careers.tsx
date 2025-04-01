
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, MapPin, Clock, Zap } from "lucide-react";

const Careers = () => {
  // Mock job listings
  const jobListings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Join our engineering team to build and improve our interactive educational platform using React, TypeScript, and modern web technologies.",
      requirements: [
        "5+ years of frontend development experience",
        "Strong proficiency with React and TypeScript",
        "Experience with state management and modern CSS frameworks",
        "Passionate about education and user experience",
      ],
    },
    {
      id: 2,
      title: "Learning Experience Designer",
      department: "Product",
      location: "New York or Remote",
      type: "Full-time",
      description: "Help design engaging, effective learning experiences that make complex topics accessible and enjoyable for learners of all backgrounds.",
      requirements: [
        "3+ years of experience in instructional design or UX",
        "Understanding of learning sciences and educational psychology",
        "Experience creating interactive learning materials",
        "Portfolio of educational design work",
      ],
    },
    {
      id: 3,
      title: "Educator Success Manager",
      department: "Operations",
      location: "Remote",
      type: "Full-time",
      description: "Support our growing community of educators in creating high-quality educational content and building successful teaching practices on our platform.",
      requirements: [
        "2+ years in customer success or educator support",
        "Excellent communication and relationship-building skills",
        "Understanding of online teaching best practices",
        "Passion for helping others succeed",
      ],
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Help us transform education by creating innovative learning experiences that connect educators and learners worldwide.
          </p>
        </div>
        
        {/* Why Join Us */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Work at SmartGig</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Zap className="mr-2 text-brand-blue" size={20} />
                  Meaningful Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your work will directly help thousands of educators and learners achieve their goals through better educational experiences.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Clock className="mr-2 text-brand-blue" size={20} />
                  Flexible Work
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We offer remote-first, flexible working arrangements that prioritize work-life balance and personal wellbeing.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="mr-2 text-brand-blue" size={20} />
                  Global Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Join a diverse, international team passionate about education and creating positive change in the world.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
          
          <div className="space-y-6">
            {jobListings.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription className="mt-1">{job.department}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-gray-600 mb-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <div className="text-sm bg-gray-100 px-2 py-0.5 rounded-full inline-block">
                        {job.type}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{job.description}</p>
                  
                  <h4 className="font-semibold mb-2">Requirements:</h4>
                  <ul className="space-y-1 mb-4">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="bg-brand-blue hover:bg-brand-dark">
                    Apply Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Benefits */}
        <div className="bg-gray-50 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Benefits & Perks</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Competitive Compensation</h3>
              <p className="text-gray-600 text-sm">
                Salary, equity, and performance bonuses that reward your contributions.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Health & Wellness</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive health insurance and wellness program stipends.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Learning Budget</h3>
              <p className="text-gray-600 text-sm">
                Annual budget for courses, books, and conferences to support your growth.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Remote-First Culture</h3>
              <p className="text-gray-600 text-sm">
                Work from anywhere with flexible hours and regular team retreats.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Don't See the Right Fit?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals who are passionate about education. Send us your resume, and we'll keep you in mind for future opportunities.
          </p>
          <Button className="bg-brand-blue hover:bg-brand-dark">
            Send General Application
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Careers;
