
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Users,
  Target,
  Award,
  Shield,
  Map,
  Star,
  ArrowRight
} from "lucide-react";

import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                About <span className="text-gradient">Namibian Service Hub</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We're on a mission to transform how services are discovered, booked, and delivered across Namibia, creating opportunities for service providers and convenience for customers.
              </p>
              <Button
                className="btn-primary"
                onClick={() => setLocation("/contact")}
              >
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="w-full max-w-md">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" 
                  alt="Team at Namibian Service Hub"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="modern-card">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                To create a reliable and accessible platform that connects quality service providers with customers in Namibia, simplifying the process of finding, booking, and delivering services.
              </p>
              <p className="text-gray-600">
                We aim to empower local professionals while providing customers with convenient access to the services they need, ultimately improving service delivery across the country.
              </p>
            </div>

            <div className="modern-card">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-600 mb-4">
                To become Namibia's leading service marketplace, known for excellence, reliability, and innovation in connecting service providers with customers.
              </p>
              <p className="text-gray-600">
                We envision a future where every Namibian has easy access to quality services, and where skilled professionals can build successful businesses through our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at Namibian Service Hub
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="modern-card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our platform, from user experience to customer support.
              </p>
            </div>

            <div className="modern-card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trust & Safety</h3>
              <p className="text-gray-600">
                We prioritize creating a safe and trustworthy environment for both customers and service providers.
              </p>
            </div>

            <div className="modern-card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-gray-600">
                We're committed to maintaining high standards and promoting quality service delivery across all categories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Our Story</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              How Namibian Service Hub came to be
            </p>
          </div>

          <div className="modern-card">
            <div className="prose prose-lg mx-auto">
              <p>
                Namibian Service Hub was founded in 2022 by a team of entrepreneurs who recognized a significant gap in Namibia's service industry. They observed that finding reliable service providers was often challenging, while skilled professionals struggled to connect with potential customers.
              </p>
              <p>
                What began as a small startup has grown into Namibia's premier service marketplace, connecting thousands of service providers with customers across the country. Our journey has been guided by our commitment to creating value for our users and improving service delivery in Namibia.
              </p>
              <p>
                Today, we're proud to facilitate thousands of service bookings each month, helping Namibians find the help they need while creating economic opportunities for service providers. We continue to innovate and improve our platform based on user feedback and evolving market needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the people behind Namibian Service Hub
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="modern-card text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80" 
                  alt="Team Member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Sarah Nakamwe</h3>
              <p className="text-blue-600 mb-4">Chief Executive Officer</p>
              <p className="text-gray-600 text-sm">
                With over 15 years of experience in technology and business development, Sarah leads our vision to transform service delivery in Namibia.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="modern-card text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" 
                  alt="Team Member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">David Hamutenya</h3>
              <p className="text-blue-600 mb-4">Chief Technology Officer</p>
              <p className="text-gray-600 text-sm">
                David brings extensive experience in software development and product management, overseeing our platform's technical strategy and innovation.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="modern-card text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80" 
                  alt="Team Member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Maria Nangolo</h3>
              <p className="text-blue-600 mb-4">Head of Operations</p>
              <p className="text-gray-600 text-sm">
                Maria ensures the smooth daily operation of our platform, focusing on service quality, customer satisfaction, and provider success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join the Namibian Service Hub Community
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're looking for services or offering them, become part of our growing community today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-medium"
              onClick={() => setLocation("/sign-up")}
            >
              Sign Up Now
            </Button>
            <Button
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10 rounded-full px-8 py-3 text-lg font-medium"
              onClick={() => setLocation("/contact")}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
