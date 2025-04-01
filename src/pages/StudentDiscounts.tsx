
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, School, GraduationCap, Sparkles } from "lucide-react";

const StudentDiscounts = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Student Discounts</h1>
            <p className="text-gray-600">
              Unlock special pricing and benefits exclusively for students and educational institutions.
            </p>
          </div>
          
          <Tabs defaultValue="students" className="mb-12">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="students">For Students</TabsTrigger>
              <TabsTrigger value="institutions">For Institutions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="students" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <School className="h-5 w-5 text-brand-blue mr-2" />
                    <CardTitle>Student Discount Program</CardTitle>
                  </div>
                  <CardDescription>
                    Verify your student status to receive special pricing on all educational gigs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Benefits</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>50% off all educational gigs</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Free access to student-only workshops</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Exclusive learning resources</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Priority support for academic queries</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg mb-3">Verify Status</h3>
                      <div className="space-y-2">
                        <Label htmlFor="email">School Email</Label>
                        <Input id="email" type="email" placeholder="youremail@university.edu" />
                      </div>
                      <div className="pt-2">
                        <Button className="w-full bg-brand-blue hover:bg-brand-dark">
                          Verify & Unlock Discounts
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        We accept educational emails from accredited institutions worldwide.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="institutions" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <GraduationCap className="h-5 w-5 text-brand-blue mr-2" />
                    <CardTitle>Institutional Partnerships</CardTitle>
                  </div>
                  <CardDescription>
                    Special licensing options for schools, colleges, and universities.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Benefits</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Bulk licensing for entire departments</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Custom learning paths for curricula</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Analytics dashboard for educators</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>LMS integration capabilities</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Dedicated institutional support team</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg mb-3">Get in Touch</h3>
                      <div className="space-y-2">
                        <Label htmlFor="inst-name">Institution Name</Label>
                        <Input id="inst-name" placeholder="University/College/School Name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Contact Email</Label>
                        <Input id="contact-email" type="email" placeholder="your@institution.edu" />
                      </div>
                      <div className="pt-2">
                        <Button className="w-full bg-brand-blue hover:bg-brand-dark">
                          Request Information
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Sparkles className="h-5 w-5 text-brand-blue mr-2" />
              <h2 className="text-xl font-semibold">Success Stories</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Our student discount program has helped thousands of learners access quality education at affordable prices.
            </p>
            <blockquote className="border-l-4 border-brand-blue pl-4 italic text-gray-700">
              "As a computer science student, the 50% discount made it possible for me to take the AI courses I needed without breaking the bank. The skills I learned helped me land my dream internship!"
              <footer className="text-sm font-medium mt-2">— Alex T., Computer Science Major</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDiscounts;
