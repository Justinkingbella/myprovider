
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-white"}`}>
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="/" 
              className="flex items-center space-x-2"
              onClick={(e) => {
                e.preventDefault();
                setLocation("/");
                window.scrollTo(0, 0);
              }}
            >
              <div className="bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded">NSH</div>
              <span className="font-semibold text-gray-900">NamibianServiceHub</span>
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 items-center">
            <a 
              href="/" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive("/") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/");
                window.scrollTo(0, 0);
              }}
            >
              Home
            </a>
            <a 
              href="/services" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive("/services") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/services");
                window.scrollTo(0, 0);
              }}
            >
              Services
            </a>
            <a 
              href="/how-it-works" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive("/how-it-works") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/how-it-works");
                window.scrollTo(0, 0);
              }}
            >
              How It Works
            </a>
            <a 
              href="/about" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive("/about") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/about");
                window.scrollTo(0, 0);
              }}
            >
              About
            </a>
            <a 
              href="/contact" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive("/contact") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/contact");
                window.scrollTo(0, 0);
              }}
            >
              Contact
            </a>
            
            <SignedIn>
              <Button 
                className="ml-4 btn-primary"
                onClick={() => {
                  setLocation("/dashboard");
                  window.scrollTo(0, 0);
                }}
              >
                Dashboard
              </Button>
            </SignedIn>
            <SignedOut>
              <Button 
                variant="ghost"
                className="ml-4 rounded-full px-4 py-2 text-sm font-medium"
                onClick={() => {
                  setLocation("/sign-in");
                  window.scrollTo(0, 0);
                }}
              >
                Log In
              </Button>
              <Button 
                className="bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 text-sm font-medium"
                onClick={() => {
                  setLocation("/sign-up");
                  window.scrollTo(0, 0);
                }}
              >
                Sign Up
              </Button>
            </SignedOut>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2 px-4 shadow-sm">
          <div className="flex flex-col space-y-1 py-2">
            <a 
              href="/" 
              className={`px-3 py-2.5 text-sm font-medium rounded-md ${isActive("/") ? "text-blue-600 bg-blue-50" : "text-gray-700"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/");
                setMobileMenuOpen(false);
                window.scrollTo(0, 0);
              }}
            >
              Home
            </a>
            <a 
              href="/services" 
              className={`px-3 py-2.5 text-sm font-medium rounded-md ${isActive("/services") ? "text-blue-600 bg-blue-50" : "text-gray-700"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/services");
                setMobileMenuOpen(false);
                window.scrollTo(0, 0);
              }}
            >
              Services
            </a>
            <a 
              href="/how-it-works" 
              className={`px-3 py-2.5 text-sm font-medium rounded-md ${isActive("/how-it-works") ? "text-blue-600 bg-blue-50" : "text-gray-700"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/how-it-works");
                setMobileMenuOpen(false);
                window.scrollTo(0, 0);
              }}
            >
              How It Works
            </a>
            <a 
              href="/about" 
              className={`px-3 py-2.5 text-sm font-medium rounded-md ${isActive("/about") ? "text-blue-600 bg-blue-50" : "text-gray-700"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/about");
                setMobileMenuOpen(false);
                window.scrollTo(0, 0);
              }}
            >
              About
            </a>
            <a 
              href="/contact" 
              className={`px-3 py-2.5 text-sm font-medium rounded-md ${isActive("/contact") ? "text-blue-600 bg-blue-50" : "text-gray-700"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/contact");
                setMobileMenuOpen(false);
                window.scrollTo(0, 0);
              }}
            >
              Contact
            </a>
            
            <div className="pt-4 border-t border-gray-100 mt-2">
              <SignedIn>
                <Button 
                  className="w-full btn-primary"
                  onClick={() => {
                    setLocation("/dashboard");
                    setMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  Dashboard
                </Button>
              </SignedIn>
              <SignedOut>
                <div className="space-y-2">
                  <Button 
                    variant="outline"
                    className="w-full rounded-full"
                    onClick={() => {
                      setLocation("/sign-in");
                      setMobileMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    Log In
                  </Button>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                    onClick={() => {
                      setLocation("/sign-up");
                      setMobileMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </SignedOut>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
