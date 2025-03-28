
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
              SmartGig
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-brand-blue font-medium">
              Home
            </Link>
            <Link to="/gigs" className="text-gray-700 hover:text-brand-blue font-medium">
              Gigs
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-brand-blue font-medium">
              About Us
            </Link>
            <Link to="/ai-path" className="text-gray-700 hover:text-brand-blue font-medium">
              AI Learning Paths
            </Link>
          </nav>

          {/* Search and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Search gigs..." 
                className="pl-8 w-64"
              />
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <User size={16} />
              <span>Login</span>
            </Button>
            <Button size="sm" className="bg-brand-blue hover:bg-brand-dark">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 animate-fade-in">
            <nav className="flex flex-col space-y-4 py-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-brand-blue font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/gigs" 
                className="text-gray-700 hover:text-brand-blue font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Gigs
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-brand-blue font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/ai-path" 
                className="text-gray-700 hover:text-brand-blue font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Learning Paths
              </Link>
            </nav>
            <div className="pt-4 pb-2">
              <div className="relative mb-4">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  type="text" 
                  placeholder="Search gigs..." 
                  className="pl-8 w-full"
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Login
                </Button>
                <Button size="sm" className="flex-1 bg-brand-blue hover:bg-brand-dark">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
