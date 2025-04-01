
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Video, FileText, Award, Calendar } from "lucide-react";

const EducatorResources = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Educator Resources</h1>
        <p className="text-gray-600 mb-8">Access tools and guides to help you create engaging educational content.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Book className="mr-2 text-brand-blue" size={20} />
                Teaching Guides
              </CardTitle>
              <CardDescription>Best practices for engaging students</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                <li>Interactive Learning Techniques</li>
                <li>Building Effective Assessments</li>
                <li>Student Engagement Strategies</li>
                <li>Accessibility in Education</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Video className="mr-2 text-brand-blue" size={20} />
                Video Production
              </CardTitle>
              <CardDescription>Create professional educational videos</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                <li>Video Recording Essentials</li>
                <li>Lighting and Audio Setup</li>
                <li>Editing Software Tutorials</li>
                <li>Visual Presentation Tips</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <FileText className="mr-2 text-brand-blue" size={20} />
                Course Templates
              </CardTitle>
              <CardDescription>Ready-to-use educational frameworks</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                <li>Curriculum Planning Templates</li>
                <li>Syllabus Design Guides</li>
                <li>Assessment Frameworks</li>
                <li>Interactive Exercise Templates</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Award className="mr-2 text-brand-blue" size={20} />
                Certification Courses
              </CardTitle>
              <CardDescription>Enhance your teaching credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                <li>Online Teaching Certification</li>
                <li>Digital Assessment Design</li>
                <li>Inclusive Education Training</li>
                <li>Advanced Pedagogy Certificate</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 text-brand-blue" size={20} />
                Upcoming Workshops
              </CardTitle>
              <CardDescription>Live learning opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                <li>Digital Tools for Educators</li>
                <li>Creating Engaging Course Content</li>
                <li>AI in Education Workshop</li>
                <li>Assessment Design Masterclass</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default EducatorResources;
