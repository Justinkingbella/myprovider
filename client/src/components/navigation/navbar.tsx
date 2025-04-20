
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="/" 
              className="flex items-center space-x-2"
              onClick={(e) => {
                e.preventDefault();
                setLocation("/");
              }}
            >
              <div className="bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded">NSH</div>
              <span className="font-semibold text-gray-900">Namibian Service Hub</span>
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <a 
              href="/" 
              className={`px-3 py-2 text-sm font-medium ${isActive("/") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/");
              }}
            >
              Home
            </a>
            <a 
              href="/services" 
              className={`px-3 py-2 text-sm font-medium ${isActive("/services") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/services");
              }}
            >
              Services
            </a>
            <a 
              href="/how-it-works" 
              className={`px-3 py-2 text-sm font-medium ${isActive("/how-it-works") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/how-it-works");
              }}
            >
              How It Works
            </a>
            <a 
              href="/about" 
              className={`px-3 py-2 text-sm font-medium ${isActive("/about") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/about");
              }}
            >
              About Us
            </a>
            <a 
              href="/contact" 
              className={`px-3 py-2 text-sm font-medium ${isActive("/contact") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/contact");
              }}
            >
              Contact
            </a>
            
            <SignedIn>
              <Button 
                variant="ghost"
                className="ml-4"
                onClick={() => setLocation("/dashboard")}
              >
                Dashboard
              </Button>
            </SignedIn>
            <SignedOut>
              <Button 
                variant="ghost"
                className="ml-4"
                onClick={() => setLocation("/sign-in")}
              >
                Log In
              </Button>
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setLocation("/sign-up")}
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2 px-4">
          <div className="flex flex-col space-y-2">
            <a 
              href="/" 
              className={`px-3 py-2 text-sm font-medium ${isActive("/") ? "text-blue-600" : "text-gray-700"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/");
                setMobileMenuOpen(false);
              }}
            >
              Home
            </a>
            <a 
              href="/services" 
              className={`px-3 py-2 text-sm font-medium ${isActive("/services") ? "text-blue-600" : "text-gray-700"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/services");
                setMobileMenuOpen(false);
              }}
            >
              Services
            </a>
            <a 
              href="/how-it-works" 
              className={`px-3 py-2 text-sm font-medium ${isActive("/how-it-works") ? "text-blue-600" : "text-gray-700"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/how-it-works");
                setMobileMenuOpen(false);
              }}
            >
              How It Works
            </a>
            <a 
              href="/about" 
              className={`px-3 py-2 text-sm font-medium ${isActive("/about") ? "text-blue-600" : "text-gray-700"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/about");
                setMobileMenuOpen(false);
              }}
            >
              About Us
            </a>
            <a 
              href="/contact" 
              className={`px-3 py-2 text-sm font-medium ${isActive("/contact") ? "text-blue-600" : "text-gray-700"}`}
              onClick={(e) => {
                e.preventDefault();
                setLocation("/contact");
                setMobileMenuOpen(false);
              }}
            >
              Contact
            </a>
            
            <div className="pt-4 border-t border-gray-200 mt-2">
              <SignedIn>
                <Button 
                  variant="default"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setLocation("/dashboard");
                    setMobileMenuOpen(false);
                  }}
                >
                  Dashboard
                </Button>
              </SignedIn>
              <SignedOut>
                <div className="space-y-2">
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setLocation("/sign-in");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Log In
                  </Button>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      setLocation("/sign-up");
                      setMobileMenuOpen(false);
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
