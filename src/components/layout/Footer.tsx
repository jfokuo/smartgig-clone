
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
                SmartGig
              </span>
            </Link>
            <p className="text-gray-600 mb-4">
              Connecting educators with learners to create engaging educational experiences.
            </p>
            <div className="flex space-x-3">
              <Link to="/social/facebook" className="text-gray-500 hover:text-brand-blue transition">
                <Facebook size={20} />
              </Link>
              <Link to="/social/twitter" className="text-gray-500 hover:text-brand-blue transition">
                <Twitter size={20} />
              </Link>
              <Link to="/social/instagram" className="text-gray-500 hover:text-brand-blue transition">
                <Instagram size={20} />
              </Link>
              <Link to="/social/linkedin" className="text-gray-500 hover:text-brand-blue transition">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-gray-900 mb-4">For Educators</h3>
            <ul className="space-y-2">
              <li><Link to="/create-gig" className="text-gray-600 hover:text-brand-blue">Create a Gig</Link></li>
              <li><Link to="/educator-resources" className="text-gray-600 hover:text-brand-blue">Educator Resources</Link></li>
              <li><Link to="/success-stories/educators" className="text-gray-600 hover:text-brand-blue">Success Stories</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-brand-blue">Pricing</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-gray-900 mb-4">For Learners</h3>
            <ul className="space-y-2">
              <li><Link to="/gigs" className="text-gray-600 hover:text-brand-blue">Browse Gigs</Link></li>
              <li><Link to="/ai-path" className="text-gray-600 hover:text-brand-blue">AI Learning Paths</Link></li>
              <li><Link to="/student-discounts" className="text-gray-600 hover:text-brand-blue">Student Discounts</Link></li>
              <li><Link to="/success-stories/learners" className="text-gray-600 hover:text-brand-blue">Success Stories</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-brand-blue">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-brand-blue">Careers</Link></li>
              <li><Link to="/press" className="text-gray-600 hover:text-brand-blue">Press</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-brand-blue">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} SmartGig. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-brand-blue text-sm">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-gray-500 hover:text-brand-blue text-sm">Terms of Service</Link>
              <Link to="/cookie-policy" className="text-gray-500 hover:text-brand-blue text-sm">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
