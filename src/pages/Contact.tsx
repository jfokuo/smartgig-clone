
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MessageSquare, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600 mb-6">
              Have questions or feedback? We'd love to hear from you. Fill out the form below and our team will get back to you shortly.
            </p>
            
            <Card>
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="johndoe@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Contact</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="educator-support">Educator Support</SelectItem>
                        <SelectItem value="learner-support">Learner Support</SelectItem>
                        <SelectItem value="business-inquiry">Business Inquiry</SelectItem>
                        <SelectItem value="press">Press/Media</SelectItem>
                        <SelectItem value="bug-report">Bug Report/Technical Issue</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us how we can help..."
                      className="min-h-32"
                    />
                  </div>
                  
                  <Button className="w-full md:w-auto bg-brand-blue hover:bg-brand-dark">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Information */}
          <div className="lg:pt-16">
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-brand-blue mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <p className="text-gray-600">General Inquiries: info@smartgig.com</p>
                      <p className="text-gray-600">Support: support@smartgig.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-brand-blue mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-gray-600 text-sm">Monday-Friday, 9am-5pm ET</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-brand-blue mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Visit Us</h3>
                      <p className="text-gray-600">
                        123 Education Lane<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Specialized Support</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-brand-blue mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">For Educators</h3>
                      <p className="text-gray-600">
                        Get help with creating and managing your educational gigs.
                      </p>
                      <a href="#" className="text-brand-blue hover:underline text-sm">
                        Contact Educator Support
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-brand-blue mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">For Learners</h3>
                      <p className="text-gray-600">
                        Get assistance with courses, payments, or technical issues.
                      </p>
                      <a href="#" className="text-brand-blue hover:underline text-sm">
                        Contact Learner Support
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-brand-blue mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">For Press & Media</h3>
                      <p className="text-gray-600">
                        Get information, press materials, or interview requests.
                      </p>
                      <a href="#" className="text-brand-blue hover:underline text-sm">
                        Contact Media Relations
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-brand-blue text-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Frequently Asked Questions</h2>
                <p className="mb-4">
                  Find quick answers to common questions in our help center.
                </p>
                <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                  Visit Help Center
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
