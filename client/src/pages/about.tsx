
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Users, Globe, Award, Clock, Shield, Target } from "lucide-react";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <header className="bg-white py-12 px-4 border-b border-gray-200">
        <div className="container mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">About Us</h1>
            <p className="text-gray-600">Learn more about Namibian Service Hub</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          {/* Our Mission */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                To connect Namibians with skilled and trusted service providers, empowering service professionals to grow their business while helping customers find quality services with ease.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">For Customers</h3>
                  <p className="text-gray-600 mb-4">
                    We're committed to making it simple for you to find trusted, quality service providers across Namibia. Our platform offers a convenient way to book services, compare providers, and ensure you receive excellent value for your money.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                      <span>Access to verified service providers</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                      <span>Secure booking and payment system</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                      <span>Transparent pricing and reviews</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">For Service Providers</h3>
                  <p className="text-gray-600 mb-4">
                    We offer a platform for skilled professionals to showcase their services, find new clients, and grow their business. Our easy-to-use tools help you manage bookings, payments, and customer relationships effectively.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                      <span>Increase visibility to potential clients</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                      <span>Simple booking and schedule management</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                      <span>Secure, timely payments</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* Our Story */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <p className="text-gray-600 mb-4">
                Namibian Service Hub was founded in 2023 by a team of entrepreneurs who recognized the challenges faced by both service providers and customers in Namibia.
              </p>
              <p className="text-gray-600 mb-4">
                We observed that skilled professionals often struggled to find consistent work and expand their client base, while customers had difficulty finding reliable service providers for their needs.
              </p>
              <p className="text-gray-600 mb-4">
                Our platform was created to bridge this gap by providing a trusted marketplace where service professionals can showcase their skills and customers can easily find and book the services they need.
              </p>
              <p className="text-gray-600">
                Starting with just a few service categories in Windhoek, we've now expanded to cover multiple regions across Namibia and offer a wide range of services from home maintenance to professional consulting.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-blue-600 mb-2">500+</h3>
                <p className="text-gray-600">Service Providers</p>
              </div>
              
              <div className="flex-1 bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-blue-600 mb-2">14</h3>
                <p className="text-gray-600">Regions Covered</p>
              </div>
              
              <div className="flex-1 bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-blue-600 mb-2">12k+</h3>
                <p className="text-gray-600">Completed Jobs</p>
              </div>
            </div>
          </section>
          
          {/* Our Values */}
          <section className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                These core principles guide everything we do at Namibian Service Hub
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Trust & Safety</h3>
                    <p className="text-gray-600">
                      We prioritize creating a safe and trustworthy environment through thorough verification processes and secure systems.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Quality Service</h3>
                    <p className="text-gray-600">
                      We're committed to maintaining high standards by promoting and rewarding excellence in service delivery.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Reliability</h3>
                    <p className="text-gray-600">
                      We ensure that our platform operates reliably and that service providers deliver on their commitments.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Community Impact</h3>
                    <p className="text-gray-600">
                      We're dedicated to supporting local economic growth by connecting Namibian service providers with customers in their communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA */}
          <section className="max-w-4xl mx-auto mt-16 text-center">
            <div className="bg-blue-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Join Our Growing Community</h2>
              <p className="text-gray-600 mb-6">
                Whether you're looking for services or offering your skills, we invite you to be part of our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => setLocation("/sign-up")}
                >
                  Create an Account
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setLocation("/contact")}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
