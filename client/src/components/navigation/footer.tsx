
import { useLocation } from "wouter";
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const [, setLocation] = useLocation();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded">NSH</div>
              <span className="font-semibold text-white">Namibian Service Hub</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Connecting service providers with customers across Namibia, making it easy to find quality services for your everyday needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4 text-base">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/");
                    window.scrollTo(0, 0);
                  }}
                  className="text-gray-400 hover:text-white transition-colors inline-block hover:translate-x-1"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/services");
                    window.scrollTo(0, 0);
                  }}
                  className="text-gray-400 hover:text-white transition-colors inline-block hover:translate-x-1"
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/how-it-works");
                    window.scrollTo(0, 0);
                  }}
                  className="text-gray-400 hover:text-white transition-colors inline-block hover:translate-x-1"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/about");
                    window.scrollTo(0, 0);
                  }}
                  className="text-gray-400 hover:text-white transition-colors inline-block hover:translate-x-1"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/contact");
                    window.scrollTo(0, 0);
                  }}
                  className="text-gray-400 hover:text-white transition-colors inline-block hover:translate-x-1"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-bold text-white mb-4 text-base">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors inline-block hover:translate-x-1">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors inline-block hover:translate-x-1">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors inline-block hover:translate-x-1">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors inline-block hover:translate-x-1">Safety Tips</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors inline-block hover:translate-x-1">Careers & Support</a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-4 text-base">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 shrink-0 text-gray-400 mt-0.5" />
                <span className="text-sm">123 Independence Ave, Windhoek, Namibia</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 shrink-0 text-gray-400" />
                <span className="text-sm">+264 61 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 shrink-0 text-gray-400" />
                <span className="text-sm">info@namibianservicehub.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© 2023 Namibian Service Hub. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
