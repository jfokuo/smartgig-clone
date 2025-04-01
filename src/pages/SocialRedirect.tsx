
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Loader2 } from "lucide-react";

const SocialRedirect = () => {
  const { platform } = useParams();
  const navigate = useNavigate();
  
  // Social media URLs
  const socialUrls = {
    facebook: "https://facebook.com/smartgig",
    twitter: "https://twitter.com/smartgig",
    instagram: "https://instagram.com/smartgig",
    linkedin: "https://linkedin.com/company/smartgig",
  };
  
  useEffect(() => {
    // Check if platform exists in our mapping
    if (platform && platform in socialUrls) {
      // Redirect to the social media platform after a short delay
      const timer = setTimeout(() => {
        window.location.href = socialUrls[platform as keyof typeof socialUrls];
      }, 2000);
      
      return () => clearTimeout(timer);
    } else {
      // Redirect to home page if platform is not recognized
      navigate("/");
    }
  }, [platform, navigate]);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Loader2 className="h-12 w-12 animate-spin text-brand-blue mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">
            Redirecting you to our {platform && platform.charAt(0).toUpperCase() + platform.slice(1)} page
          </h1>
          <p className="text-gray-600 mb-6">
            You'll be redirected in a moment. If you're not redirected automatically, please click the button below.
          </p>
          <a 
            href={platform && platform in socialUrls ? socialUrls[platform as keyof typeof socialUrls] : "/"} 
            className="inline-block px-6 py-3 bg-brand-blue text-white rounded-md hover:bg-brand-dark transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to {platform && platform.charAt(0).toUpperCase() + platform.slice(1)}
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default SocialRedirect;
