
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useLocation } from "wouter";
import { 
  Shield, 
  Clock, 
  MapPin, 
  CreditCard, 
  Brush, 
  Wrench, 
  Zap, 
  Flower2, 
  Car, 
  Scissors, 
  GraduationCap, 
  CalendarDays 
} from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Hero Section with Yellow Background */}
      <header className="bg-yellow-400 py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <nav className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2">
              <div className="bg-black text-white text-xs font-bold py-1 px-2 rounded">NSH</div>
              <span className="font-semibold">Namibian Service</span>
            </div>
            
            <div className="flex items-center gap-4">
              <SignedIn>
                <Button 
                  variant="outline" 
                  className="bg-white hover:bg-gray-100"
                  onClick={() => setLocation("/dashboard")}
                >
                  Dashboard
                </Button>
              </SignedIn>
              <SignedOut>
                <Button 
                  variant="outline" 
                  className="bg-white hover:bg-gray-100"
                  onClick={() => setLocation("/sign-in")}
                >
                  Log In
                </Button>
                <Button 
                  className="bg-black text-white hover:bg-gray-800"
                  onClick={() => setLocation("/sign-up")}
                >
                  Sign Up
                </Button>
              </SignedOut>
            </div>
          </nav>

          <div className="text-center max-w-3xl mx-auto transform transition-all animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Namibia's Premier Service Marketplace
            </h1>
            <p className="text-lg mb-8 text-gray-800 max-w-2xl mx-auto">
              Connect with trusted service providers or offer your skills to customers 
              across Namibia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6 h-auto"
                onClick={() => setLocation("/sign-up")}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                className="bg-white hover:bg-gray-100 text-lg px-8 py-6 h-auto"
                onClick={() => setLocation("/service-browse")}
              >
                Browse Services
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Why Choose Namibian Service Hub?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
                <p className="text-gray-600 mb-4">
                  Every service provider on our platform undergoes a thorough verification process, ensuring you receive quality service.
                </p>
                <ul className="space-y-2 text-left w-full">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Background checks</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">ID verification</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Customer reviews</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Quality monitoring</span>
                  </li>
                </ul>
                <Button variant="outline" className="mt-4 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 border-yellow-200">
                  Learn About Our Process
                </Button>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Book Instantly</h3>
                <p className="text-gray-600 mb-4">
                  Schedule services at your convenience with our real-time booking system. Receive immediate confirmation.
                </p>
                <div className="mt-auto pt-6">
                  <Button variant="ghost" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                    Book a Service Now
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                <p className="text-gray-600 mb-4">
                  Your transactions are protected with our secure payment system supporting multiple payment methods.
                </p>
                <div className="mt-auto pt-6">
                  <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                    Learn About Security
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Card 4 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Local Services</h3>
                <p className="text-gray-600 mb-4">
                  Find service providers in your area across all regions of Namibia, supporting local businesses.
                </p>
                <div className="mt-auto pt-6">
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    Find Local Services
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Card 5 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Multiple Payment Options</h3>
                <p className="text-gray-600 mb-4">
                  We support various payment methods to make transactions convenient and accessible.
                </p>
                <div className="grid grid-cols-2 gap-2 w-full mt-2">
                  <div className="border rounded p-2 flex items-center justify-center text-sm">
                    <span>Credit/Debit</span>
                  </div>
                  <div className="border rounded p-2 flex items-center justify-center text-sm">
                    <span>Bank Transfer</span>
                  </div>
                  <div className="border rounded p-2 flex items-center justify-center text-sm">
                    <span>Mobile Money</span>
                  </div>
                  <div className="border rounded p-2 flex items-center justify-center text-sm">
                    <span>Cash on Delivery</span>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200">
                  View Payment Options
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Popular Services
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all p-4 text-center transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brush className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-semibold mb-1">Home Cleaning</h3>
              <p className="text-sm text-gray-500">142 providers</p>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all p-4 text-center transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wrench className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-1">Plumbing</h3>
              <p className="text-sm text-gray-500">78 providers</p>
            </div>
            
            {/* Service 3 */}
            <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all p-4 text-center transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-1">Electrical Work</h3>
              <p className="text-sm text-gray-500">95 providers</p>
            </div>
            
            {/* Service 4 */}
            <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all p-4 text-center transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Flower2 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-1">Gardening</h3>
              <p className="text-sm text-gray-500">63 providers</p>
            </div>
            
            {/* Service 5 */}
            <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all p-4 text-center transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Car className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="font-semibold mb-1">Car Repairs</h3>
              <p className="text-sm text-gray-500">86 providers</p>
            </div>
            
            {/* Service 6 */}
            <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all p-4 text-center transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Scissors className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="font-semibold mb-1">Beauty & Spa</h3>
              <p className="text-sm text-gray-500">127 providers</p>
            </div>
            
            {/* Service 7 */}
            <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all p-4 text-center transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold mb-1">Home Tutoring</h3>
              <p className="text-sm text-gray-500">91 providers</p>
            </div>
            
            {/* Service 8 */}
            <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all p-4 text-center transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CalendarDays className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-1">Event Planning</h3>
              <p className="text-sm text-gray-500">74 providers</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" className="border-gray-300">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-orange-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of Namibians who are already using our platform to find services or grow their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-black text-white hover:bg-gray-800"
              onClick={() => setLocation("/sign-up")}
            >
              Create an Account
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent text-white border-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">About Us</h3>
              <p className="text-gray-600 mb-4">
                Namibian Service Hub connects service providers with customers across Namibia, making it easy to find quality services.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Home</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">How It Works</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Service Providers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Home Services</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Professional Services</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Health & Wellness</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Education & Tutoring</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Events & Entertainment</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Independence Avenue, Windhoek, Namibia</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+264 61 123 456</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@namibianservicehub.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2023 Namibian Service Hub. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-600 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-gray-600 text-sm">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
