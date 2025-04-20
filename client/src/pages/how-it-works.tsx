import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Search,
  Calendar,
  CheckCircle,
  MessageSquare,
  CreditCard,
  Star,
  ArrowRight,
  User,
  Briefcase
} from "lucide-react";

import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function HowItWorks() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">How It Works</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Namibian Service Hub makes finding and booking local services simple, secure, and efficient.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="btn-primary"
              onClick={() => {
                document.getElementById("customers")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              For Customers
            </Button>
            <Button 
              variant="outline"
              className="btn-secondary"
              onClick={() => {
                document.getElementById("providers")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              For Service Providers
            </Button>
          </div>
        </div>
      </section>

      {/* For Customers Section */}
      <section id="customers" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">For Customers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Finding and booking services has never been easier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <div className="bg-gray-100 text-blue-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">Search for Services</h3>
              <p className="text-gray-600">
                Browse through various service categories or use the search function to find specific services in your area.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div className="bg-gray-100 text-blue-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">Compare Providers</h3>
              <p className="text-gray-600">
                Review profiles, ratings, reviews, and prices to find the best service provider for your needs.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <div className="bg-gray-100 text-blue-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Book a Time Slot</h3>
              <p className="text-gray-600">
                Select from available time slots that work with your schedule and book instantly.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <div className="bg-gray-100 text-blue-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4">4</div>
              <h3 className="text-xl font-semibold mb-3">Communicate Details</h3>
              <p className="text-gray-600">
                Chat directly with your service provider to discuss specific requirements or share additional information.
              </p>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <div className="bg-gray-100 text-blue-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4">5</div>
              <h3 className="text-xl font-semibold mb-3">Receive the Service</h3>
              <p className="text-gray-600">
                The provider arrives at the scheduled time to deliver the service professionally and efficiently.
              </p>
            </div>

            {/* Step 6 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <div className="bg-gray-100 text-blue-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4">6</div>
              <h3 className="text-xl font-semibold mb-3">Rate and Review</h3>
              <p className="text-gray-600">
                Share your experience by rating and reviewing the service, helping other customers make informed decisions.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              className="btn-primary"
              onClick={() => setLocation("/services")}
            >
              Browse Services <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* For Service Providers Section */}
      <section id="providers" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">For Service Providers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Grow your business and manage your services efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div className="bg-gray-100 text-blue-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">Create an Account</h3>
              <p className="text-gray-600">
                Sign up as a service provider and complete your verification process to get started.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <div className="bg-gray-100 text-blue-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">List Your Services</h3>
              <p className="text-gray-600">
                Add your services with detailed descriptions, pricing information, and high-quality photos.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <div className="bg-gray-100 text-blue-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Set Your Availability</h3>
              <p className="text-gray-600">
                Define your working hours and when you're available to provide services.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <div className="bg-gray-100 text-blue-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4">4</div>
              <h3 className="text-xl font-semibold mb-3">Receive Bookings</h3>
              <p className="text-gray-600">
                Get notified when customers book your services and communicate with them through our platform.
              </p>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <div className="bg-gray-100 text-blue-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4">5</div>
              <h3 className="text-xl font-semibold mb-3">Provide Services</h3>
              <p className="text-gray-600">
                Deliver exceptional service to your customers at the scheduled time and location.
              </p>
            </div>

            {/* Step 6 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <div className="bg-gray-100 text-blue-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4">6</div>
              <h3 className="text-xl font-semibold mb-3">Get Paid</h3>
              <p className="text-gray-600">
                Receive secure payments directly to your account after services are completed.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              className="btn-primary"
              onClick={() => setLocation("/sign-up")}
            >
              Become a Provider <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions? Find answers to common queries below
            </p>
          </div>

          <div className="space-y-6">
            <div className="modern-card">
              <h3 className="text-xl font-semibold mb-2">How do I book a service?</h3>
              <p className="text-gray-600">
                Simply search for the service you need, select a provider, choose a time slot, and confirm your booking. You'll receive a confirmation immediately.
              </p>
            </div>

            <div className="modern-card">
              <h3 className="text-xl font-semibold mb-2">How are service providers verified?</h3>
              <p className="text-gray-600">
                All service providers undergo a thorough verification process, including identity verification, background checks, and skills assessment to ensure quality and safety.
              </p>
            </div>

            <div className="modern-card">
              <h3 className="text-xl font-semibold mb-2">Can I cancel or reschedule a booking?</h3>
              <p className="text-gray-600">
                Yes, you can cancel or reschedule bookings through your account. Please note that cancellation policies may vary depending on the service provider.
              </p>
            </div>

            <div className="modern-card">
              <h3 className="text-xl font-semibold mb-2">How do payments work?</h3>
              <p className="text-gray-600">
                You can pay securely through our platform using various payment methods. Payment is only released to the service provider after the service is completed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Experience Better Services?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Namibian Service Hub today and connect with top service providers in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-medium"
              onClick={() => setLocation("/sign-up")}
            >
              Create an Account
            </Button>
            <Button
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10 rounded-full px-8 py-3 text-lg font-medium"
              onClick={() => setLocation("/services")}
            >
              Browse Services
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}