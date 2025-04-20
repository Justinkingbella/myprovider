
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { ChevronRight, CheckCircle, User, Briefcase, Search, MessageSquare, Shield, ArrowRight } from "lucide-react";

export default function Home() {
  const { isSignedIn, user } = useUser();
  const [, setLocation] = useLocation();

  // Redirect to dashboard if already signed in
  useEffect(() => {
    if (isSignedIn) {
      setLocation("/dashboard");
    }
  }, [isSignedIn, setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-primary shadow-lg transform hover:scale-105 transition-transform flex items-center justify-center text-white font-bold">NS</div>
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              NamServe
            </span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#features" className="text-gray-700 hover:text-primary transition-colors">Features</a>
            <a href="#services" className="text-gray-700 hover:text-primary transition-colors">Services</a>
            <a href="#pricing" className="text-gray-700 hover:text-primary transition-colors">Pricing</a>
            <a href="#testimonials" className="text-gray-700 hover:text-primary transition-colors">Testimonials</a>
          </nav>
          <div>
            <SignedIn>
              <Button onClick={() => setLocation("/dashboard")} className="shadow-md hover:shadow-lg transition-shadow">
                Go to Dashboard
              </Button>
            </SignedIn>
            <SignedOut>
              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => setLocation("/sign-up")} className="shadow-sm hover:shadow-md transition-shadow">
                  Sign Up
                </Button>
                <Button onClick={() => setLocation("/sign-in")} className="shadow-md hover:shadow-lg transition-shadow">
                  Sign In
                </Button>
              </div>
            </SignedOut>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0 opacity-20 bg-grid-pattern"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                  <span className="block">Connect With Local</span>
                  <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                    Service Providers
                  </span>
                </h1>
                <p className="mt-6 text-xl text-gray-600 max-w-lg">
                  The premier Namibian marketplace connecting skilled professionals with customers who need their services.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => setLocation("/sign-up")} className="group shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-r from-primary to-blue-600">
                  Get Started 
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  Learn More
                </Button>
              </div>
              
              <div className="flex items-center text-sm">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>No subscription required to browse services</span>
              </div>
            </div>
            
            <div className="relative group h-[400px] md:h-[500px] shadow-2xl rounded-2xl overflow-hidden transform perspective perspective-1000 hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-primary/10 backdrop-blur-sm group-hover:backdrop-blur-none transition-all duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Service marketplace" 
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" 
              />
              <div className="absolute inset-0 shadow-inner"></div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z">
            </path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose NamServe?</h2>
            <p className="mt-4 text-lg text-gray-600">We connect service providers with customers across Namibia with a seamless and secure platform.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-8 w-8 text-primary" />,
                title: "Easy Discovery",
                description: "Find local service providers based on your location, ratings, and specific service needs."
              },
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "Secure Payments",
                description: "Multiple payment options including PayToday, PayFast, Mobile Wallets, and Bank Transfers."
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-primary" />,
                title: "Direct Communication",
                description: "Chat directly with service providers to discuss your requirements securely."
              },
              {
                icon: <User className="h-8 w-8 text-primary" />,
                title: "Verified Providers",
                description: "Every service provider undergoes a verification process to ensure quality and reliability."
              },
              {
                icon: <Briefcase className="h-8 w-8 text-primary" />,
                title: "Service Guarantee",
                description: "Dispute resolution and customer support to ensure satisfaction with every booking."
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-primary" />,
                title: "Local Focus",
                description: "Built specifically for Namibian customers and businesses with regional knowledge."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Popular Services</h2>
            <p className="mt-4 text-lg text-gray-600">Discover the most sought-after services in your area</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "Home Cleaning",
                pricing: "From N$150/hour",
                category: "Home"
              },
              {
                image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "Plumbing Services",
                pricing: "From N$200/hour",
                category: "Repair"
              },
              {
                image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "Gardening",
                pricing: "From N$120/hour",
                category: "Outdoor"
              },
              {
                image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "Professional Errands",
                pricing: "From N$100/hour",
                category: "Personal"
              }
            ].map((service, index) => (
              <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs font-medium text-blue-600 mb-1">{service.category}</div>
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-700 mb-3">{service.pricing}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-primary group-hover:text-white transition-colors" 
                    onClick={() => setLocation("/sign-in")}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button 
              onClick={() => setLocation("/sign-in")} 
              className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors px-6 shadow-lg group"
            >
              View All Services
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Two CTAs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Service Providers */}
            <div className="bg-gradient-to-br from-blue-600 to-primary text-white p-8 rounded-2xl shadow-xl transform transition-transform hover:-translate-y-1 duration-300">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <Briefcase className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">For Service Providers</h3>
                  <p className="mb-6">
                    Grow your business by joining our platform. Reach more customers and streamline your booking process.
                  </p>
                  <ul className="space-y-2 mb-8">
                    {['Set your own rates', 'Manage your schedule', 'Get paid securely', 'Build your reputation'].map((item, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  onClick={() => setLocation("/sign-up")} 
                  className="w-full bg-white text-blue-600 hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Register as a Provider
                </Button>
              </div>
            </div>
            
            {/* For Customers */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-xl transform transition-transform hover:-translate-y-1 duration-300">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <User className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">For Customers</h3>
                  <p className="mb-6">
                    Find reliable service providers for all your needs. Book, pay, and review all in one place.
                  </p>
                  <ul className="space-y-2 mb-8">
                    {['Compare service providers', 'Read verified reviews', 'Schedule at your convenience', 'Pay securely online'].map((item, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  onClick={() => setLocation("/sign-up")} 
                  className="w-full bg-white text-gray-800 hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Find Services
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">What Our Users Say</h2>
            <p className="mt-4 text-lg text-gray-600">Real experiences from service providers and customers across Namibia</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "NamServe has completely transformed my small plumbing business. I've increased my client base by 70% since joining!",
                author: "Thomas Shilongo",
                role: "Service Provider",
                location: "Windhoek"
              },
              {
                quote: "As a busy professional, finding reliable home services used to be difficult. NamServe has made it so simple to find quality providers.",
                author: "Maria Nangolo",
                role: "Customer",
                location: "Swakopmund"
              },
              {
                quote: "The payment system is secure and the booking process is incredibly user-friendly. Highly recommend for all service providers!",
                author: "David Amukwaya",
                role: "Service Provider",
                location: "Oshakati"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="italic text-gray-700 mb-6 flex-grow">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.role} • {testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of Namibians already using NamServe to connect with local service providers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => setLocation("/sign-up")} className="bg-primary hover:bg-blue-600 transition-colors shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
              Sign Up Now
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-gray-900 transition-colors shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary shadow-lg flex items-center justify-center text-white font-bold">NS</div>
                <span className="ml-2 text-xl font-bold text-white">NamServe</span>
              </div>
              <p className="text-gray-400 mb-4">Connecting service providers with customers across Namibia.</p>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social, i) => (
                  <a key={i} href="#" className="text-gray-400 hover:text-white transition-colors">
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
            
            {[
              {
                title: "For Customers",
                links: ["Find Services", "How It Works", "Pricing", "FAQs"]
              },
              {
                title: "For Providers",
                links: ["Join as Provider", "Pricing", "Success Stories", "Resources"]
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Blog", "Contact Us", "Terms", "Privacy"]
              }
            ].map((column, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-medium text-white mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© {new Date().getFullYear()} NamServe. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS for the background grid pattern */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .perspective {
          perspective: 1000px;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
