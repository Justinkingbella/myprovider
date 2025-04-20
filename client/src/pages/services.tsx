import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Briefcase, 
  Home as HomeIcon, 
  User, 
  Truck,
  Heart, 
  HelpCircle,
  Filter,
  Sliders,
  Star,
  MapPin
} from "lucide-react";

import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";

// Mock service data
const SERVICES = [
  {
    id: 1,
    name: "Home Cleaning",
    category: "general",
    description: "Professional home cleaning services for any size residence",
    price: "N$250/hr",
    rating: 4.8,
    location: "Windhoek",
    provider: "CleanPro Services",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Plumbing Repair",
    category: "home",
    description: "Expert plumbing services for leaks, installations, and repairs",
    price: "N$350/hr",
    rating: 4.6,
    location: "Swakopmund",
    provider: "FixRight Plumbing",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Legal Consultation",
    category: "professional",
    description: "Professional legal advice on various matters",
    price: "N$600/hr",
    rating: 4.9,
    location: "Windhoek",
    provider: "Legal Solutions",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Moving Services",
    category: "transportation",
    description: "Reliable moving services for homes and offices",
    price: "N$1200/day",
    rating: 4.7,
    location: "Nationwide",
    provider: "Swift Movers",
    image: "https://images.unsplash.com/photo-1600518464441-a34d5dec4452?auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Massage Therapy",
    category: "health",
    description: "Professional massage therapy for relaxation and wellness",
    price: "N$450/session",
    rating: 4.9,
    location: "Windhoek",
    provider: "Wellness Spa",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    name: "Graphic Design",
    category: "freelance",
    description: "Creative graphic design services for businesses",
    price: "N$400/hr",
    rating: 4.8,
    location: "Remote",
    provider: "Creative Designs",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80"
  }
];

export default function Services() {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    location.includes("?category=") ? location.split("?category=")[1] : ""
  );

  // Filter services based on search query and category
  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory ? service.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
    // Update URL without page refresh
    const newLocation = category ? `/services?category=${category}` : "/services";
    setLocation(newLocation);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-4 text-center text-gradient">Browse Our Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-center mb-8">
            Find the perfect service provider for your needs in Namibia
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search for services..." 
              className="input-modern pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 border-b border-gray-200 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button 
              variant={selectedCategory === "" ? "default" : "outline"}
              className={`rounded-full ${selectedCategory === "" ? "bg-blue-600 text-white" : ""}`}
              onClick={() => handleCategorySelect("")}
            >
              All Services
            </Button>
            <Button 
              variant={selectedCategory === "general" ? "default" : "outline"}
              className={`rounded-full ${selectedCategory === "general" ? "bg-blue-600 text-white" : ""}`}
              onClick={() => handleCategorySelect("general")}
            >
              <Briefcase className="h-4 w-4 mr-2" />
              General Services
            </Button>
            <Button 
              variant={selectedCategory === "home" ? "default" : "outline"}
              className={`rounded-full ${selectedCategory === "home" ? "bg-blue-600 text-white" : ""}`}
              onClick={() => handleCategorySelect("home")}
            >
              <HomeIcon className="h-4 w-4 mr-2" />
              Home Services
            </Button>
            <Button 
              variant={selectedCategory === "professional" ? "default" : "outline"}
              className={`rounded-full ${selectedCategory === "professional" ? "bg-blue-600 text-white" : ""}`}
              onClick={() => handleCategorySelect("professional")}
            >
              <User className="h-4 w-4 mr-2" />
              Professional
            </Button>
            <Button 
              variant={selectedCategory === "transportation" ? "default" : "outline"}
              className={`rounded-full ${selectedCategory === "transportation" ? "bg-blue-600 text-white" : ""}`}
              onClick={() => handleCategorySelect("transportation")}
            >
              <Truck className="h-4 w-4 mr-2" />
              Transportation
            </Button>
            <Button 
              variant={selectedCategory === "health" ? "default" : "outline"}
              className={`rounded-full ${selectedCategory === "health" ? "bg-blue-600 text-white" : ""}`}
              onClick={() => handleCategorySelect("health")}
            >
              <Heart className="h-4 w-4 mr-2" />
              Health & Wellness
            </Button>
            <Button 
              variant={selectedCategory === "freelance" ? "default" : "outline"}
              className={`rounded-full ${selectedCategory === "freelance" ? "bg-blue-600 text-white" : ""}`}
              onClick={() => handleCategorySelect("freelance")}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Freelancers
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory 
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Services` 
                : "All Services"}
            </h2>
            <Button variant="outline" className="rounded-full">
              <Sliders className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <div key={service.id} className="modern-card-hover overflow-hidden flex flex-col h-full">
                  <div className="h-48 relative overflow-hidden rounded-lg mb-4">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{service.name}</h3>
                      <span className="text-blue-600 font-semibold">{service.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 flex-1">{service.description}</p>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {service.location}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 text-gray-700">{service.rating}</span>
                        </div>
                      </div>
                      <Button 
                        className="bg-blue-600 text-white hover:bg-blue-700 rounded-full text-sm"
                        onClick={() => alert(`Booking ${service.name}`)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No services found matching your criteria</p>
              <Button 
                className="mt-4 btn-primary"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                  setLocation("/services");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Are You a Service Provider?</h2>
          <p className="text-lg mb-6">
            Join our platform to reach thousands of potential customers and grow your business.
          </p>
          <Button
            className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-medium"
            onClick={() => setLocation("/sign-up")}
          >
            Become a Provider
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}