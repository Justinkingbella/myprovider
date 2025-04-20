
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useLocation } from "wouter";
import {
  Search,
  MapPin,
  Shield,
  Clock,
  CreditCard,
  MessageSquare,
  ArrowRight,
  Check,
  Star,
  Briefcase,
  Home as HomeIcon,
  User,
  Truck,
  Heart,
  HelpCircle,
  Zap
} from "lucide-react";

import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <header className="bg-white py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl animate-in fade-in slide-in-from-left duration-500">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your One-Stop Marketplace <span className="text-gradient">for</span><br />
                <span className="text-gradient">Local Services in Namibia</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Affordable services with trusted service providers for all your needs - from
                home repairs to skilled professionals to handymen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="btn-primary"
                  onClick={() => setLocation("/sign-up")}
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="btn-secondary"
                  onClick={() => setLocation("/services")}
                >
                  Browse Services
                </Button>
              </div>
            </div>

            <div className="w-full max-w-md animate-in fade-in slide-in-from-right duration-500">
              <div className="modern-card">
                <h3 className="text-xl font-semibold mb-4">Find a Service</h3>
                <div className="space-y-4 mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search for services..." className="input-modern pl-10" />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Your location" className="input-modern pl-10" />
                  </div>
                </div>
                <Button className="w-full btn-primary">
                  Find Services
                </Button>

                <div className="flex justify-between mt-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="h-4 w-4 mr-1 text-blue-600" />
                    <span>Verified Providers</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1 text-blue-600" />
                    <span>Quick Booking</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CreditCard className="h-4 w-4 mr-1 text-blue-600" />
                    <span>Secure Payments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Service Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Explore Our Service Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From home services to skilled professionals, find the help you need for any task or project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1 */}
            <div className="modern-card-hover text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">General Services</h3>
              <p className="text-gray-600 mb-4">
                From cleaning to maintenance, find help for your everyday tasks
              </p>
              <Button
                variant="outline"
                onClick={() => setLocation("/services?category=general")}
                className="text-blue-600 border-blue-600 hover:bg-blue-50 rounded-full"
              >
                View Services
              </Button>
            </div>

            {/* Category 2 */}
            <div className="modern-card-hover text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Home Services</h3>
              <p className="text-gray-600 mb-4">
                Professional help for repairs, renovations, and home maintenance
              </p>
              <Button
                variant="outline"
                onClick={() => setLocation("/services?category=home")}
                className="text-blue-600 border-blue-600 hover:bg-blue-50 rounded-full"
              >
                View Services
              </Button>
            </div>

            {/* Category 3 */}
            <div className="modern-card-hover text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Skilled Professionals</h3>
              <p className="text-gray-600 mb-4">
                Connect with qualified experts across various professional fields
              </p>
              <Button
                variant="outline"
                onClick={() => setLocation("/services?category=professional")}
                className="text-blue-600 border-blue-600 hover:bg-blue-50 rounded-full"
              >
                View Services
              </Button>
            </div>

            {/* Category 4 */}
            <div className="modern-card-hover text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transportation</h3>
              <p className="text-gray-600 mb-4">
                Moving and logistics services for all your transportation needs
              </p>
              <Button
                variant="outline"
                onClick={() => setLocation("/services?category=transportation")}
                className="text-blue-600 border-blue-600 hover:bg-blue-50 rounded-full"
              >
                View Services
              </Button>
            </div>

            {/* Category 5 */}
            <div className="modern-card-hover text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Health & Wellness</h3>
              <p className="text-gray-600 mb-4">
                Services that promote wellbeing and a healthier lifestyle
              </p>
              <Button
                variant="outline"
                onClick={() => setLocation("/services?category=health")}
                className="text-blue-600 border-blue-600 hover:bg-blue-50 rounded-full"
              >
                View Services
              </Button>
            </div>

            {/* Category 6 */}
            <div className="modern-card-hover text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Freelancers</h3>
              <p className="text-gray-600 mb-4">
                Talented individuals offering creative and digital services
              </p>
              <Button
                variant="outline"
                onClick={() => setLocation("/services?category=freelance")}
                className="text-blue-600 border-blue-600 hover:bg-blue-50 rounded-full"
              >
                View Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Booking a service is quick, simple, and efficient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="modern-card relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Search for a Service</h3>
              <p className="text-gray-600">
                Browse through our range of services or use the search function to find exactly what you need.
              </p>
            </div>

            {/* Step 2 */}
            <div className="modern-card relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Book a Time Slot</h3>
              <p className="text-gray-600">
                Select a trusted service provider and choose a convenient time from their available slots.
              </p>
            </div>

            {/* Step 3 */}
            <div className="modern-card relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Enjoy Quality Service</h3>
              <p className="text-gray-600">
                Sit back and relax as the professional takes care of your needs. Rate your experience afterward.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button
              className="btn-primary"
              onClick={() => setLocation("/how-it-works")}
            >
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Features That Make Us Different</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Designed to make finding and booking services incredibly efficient, secure, and reliable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="modern-card-hover">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Bookings</h3>
              <p className="text-gray-600">
                Book services instantly with real-time availability and confirmation. No more waiting for responses.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="modern-card-hover">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Providers</h3>
              <p className="text-gray-600">
                All service providers undergo thorough verification, including identity checks and skill assessments.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="modern-card-hover">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Multiple payment options available with encrypted transactions for your peace of mind.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="modern-card-hover">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Location-Based</h3>
              <p className="text-gray-600">
                Find services near you with our location-based system to minimize travel time and cost.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="modern-card-hover">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ratings & Reviews</h3>
              <p className="text-gray-600">
                Make informed decisions based on genuine ratings and reviews from other customers.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="modern-card-hover">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
              <p className="text-gray-600">
                Chat directly with service providers to discuss specific requirements before booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Service Experience in Namibia?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of Namibians who are already using our platform for seamless service connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-medium"
              onClick={() => setLocation("/sign-up")}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10 rounded-full px-8 py-3 text-lg font-medium"
              onClick={() => setLocation("/services")}
            >
              Become a Provider
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
