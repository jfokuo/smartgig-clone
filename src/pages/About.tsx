
import Layout from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & CEO",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      bio: "Former professor with a passion for making education accessible to all.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      bio: "EdTech pioneer with 15+ years experience in educational platforms.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Educator Success",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      bio: "Dedicated to helping educators create engaging learning experiences.",
    },
    {
      name: "David Thompson",
      role: "Chief Learning Officer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      bio: "Learning sciences expert focused on educational outcomes.",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About SmartGig</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Transforming education through personalized, interactive learning experiences that connect educators with learners worldwide.
          </p>
        </div>
        
        {/* Our Mission */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Mission</h2>
          <div className="bg-gray-50 p-8 rounded-lg">
            <p className="text-lg text-center max-w-3xl mx-auto">
              "To democratize education by creating a platform where passionate educators can share their knowledge and learners can access personalized, engaging educational experiences regardless of their location or background."
            </p>
          </div>
        </div>
        
        {/* Story Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-700 mb-4">
                SmartGig was founded in 2020 by Dr. Sarah Johnson, a former university professor who recognized the limitations of traditional educational models. After years of teaching, she realized that many students weren't being served by the one-size-fits-all approach of conventional education.
              </p>
              <p className="text-gray-700 mb-4">
                What began as a small platform connecting a few dozen educators with students seeking personalized learning has grown into a global community of thousands of educators and learners from over 150 countries.
              </p>
              <p className="text-gray-700">
                Today, SmartGig continues to innovate in the educational space, using AI-powered learning paths and interactive technologies to create more effective, engaging learning experiences for everyone.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" 
                alt="Team collaboration" 
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Leadership Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-brand-blue mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="bg-brand-blue text-white p-8 rounded-lg mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <p>Educators</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150,000+</div>
              <p>Learners</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <p>Countries Represented</p>
            </div>
          </div>
        </div>
        
        {/* Values Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="font-semibold text-lg mb-3">Accessibility</h3>
              <p className="text-gray-700">
                Education should be accessible to everyone, regardless of location, background, or circumstances.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="font-semibold text-lg mb-3">Innovation</h3>
              <p className="text-gray-700">
                We're constantly exploring new ways to make learning more engaging, effective, and personalized.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="font-semibold text-lg mb-3">Community</h3>
              <p className="text-gray-700">
                We believe in the power of connection between educators and learners to transform educational experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
