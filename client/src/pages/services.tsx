
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import {
  Search, 
  MapPin, 
  Brush, 
  Wrench, 
  Zap, 
  Flower2, 
  Car, 
  Scissors, 
  GraduationCap, 
  CalendarDays,
  HomeIcon,
  Briefcase,
  Heart,
  Music,
  ShoppingBag,
  Palette,
  Shirt,
  ChefHat
} from "lucide-react";

export default function Services() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocationFilter] = useState("");
  const [category, setCategory] = useState("all");

  // Example service categories
  const categories = [
    { id: "home", name: "Home Services", icon: HomeIcon, color: "bg-red-100 text-red-600" },
    { id: "professional", name: "Professional Services", icon: Briefcase, color: "bg-blue-100 text-blue-600" },
    { id: "health", name: "Health & Wellness", icon: Heart, color: "bg-green-100 text-green-600" },
    { id: "education", name: "Education & Tutoring", icon: GraduationCap, color: "bg-purple-100 text-purple-600" },
    { id: "events", name: "Events & Entertainment", icon: Music, color: "bg-orange-100 text-orange-600" },
    { id: "shopping", name: "Shopping & Delivery", icon: ShoppingBag, color: "bg-indigo-100 text-indigo-600" },
    { id: "arts", name: "Arts & Crafts", icon: Palette, color: "bg-pink-100 text-pink-600" },
    { id: "fashion", name: "Fashion & Apparel", icon: Shirt, color: "bg-cyan-100 text-cyan-600" },
    { id: "food", name: "Food & Catering", icon: ChefHat, color: "bg-amber-100 text-amber-600" },
  ];

  // Example services
  const services = [
    { 
      id: 1, 
      name: "Home Cleaning", 
      category: "home", 
      providers: 142, 
      icon: Brush, 
      color: "bg-red-100 text-red-600",
      description: "Professional home cleaning services for all your needs"
    },
    { 
      id: 2, 
      name: "Plumbing Repairs", 
      category: "home", 
      providers: 78, 
      icon: Wrench, 
      color: "bg-blue-100 text-blue-600",
      description: "Quick and reliable plumbing repair services"
    },
    { 
      id: 3, 
      name: "Electrical Work", 
      category: "home", 
      providers: 95, 
      icon: Zap, 
      color: "bg-yellow-100 text-yellow-600",
      description: "Certified electricians for all electrical services"
    },
    { 
      id: 4, 
      name: "Gardening", 
      category: "home", 
      providers: 63, 
      icon: Flower2, 
      color: "bg-green-100 text-green-600",
      description: "Expert gardening and landscaping services"
    },
    { 
      id: 5, 
      name: "Car Repair", 
      category: "professional", 
      providers: 86, 
      icon: Car, 
      color: "bg-gray-100 text-gray-600",
      description: "Vehicle maintenance and repair services"
    },
    { 
      id: 6, 
      name: "Hair & Beauty", 
      category: "health", 
      providers: 127, 
      icon: Scissors, 
      color: "bg-pink-100 text-pink-600",
      description: "Professional hair styling and beauty services"
    },
    { 
      id: 7, 
      name: "Tutoring", 
      category: "education", 
      providers: 91, 
      icon: GraduationCap, 
      color: "bg-indigo-100 text-indigo-600",
      description: "Private tutoring for all subjects and grade levels"
    },
    { 
      id: 8, 
      name: "Event Planning", 
      category: "events", 
      providers: 74, 
      icon: CalendarDays, 
      color: "bg-purple-100 text-purple-600",
      description: "Comprehensive event planning and management services"
    },
  ];

  // Filter services based on search, location, and category
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" || service.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-yellow-400 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Find Services</h1>
              <p className="text-gray-800">Browse through our comprehensive list of services</p>
            </div>
            <Button 
              variant="outline" 
              className="bg-white mt-4 md:mt-0"
              onClick={() => setLocation("/")}
            >
              <HomeIcon className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
          
          {/* Search and Filter */}
          <div className="bg-white p-4 rounded-xl shadow">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search for services..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="md:col-span-3 relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Location..." 
                  value={location}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="md:col-span-3">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-1">
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="services">All Services</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
            </TabsList>
            
            <TabsContent value="services">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map(service => (
                  <div key={service.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${service.color}`}>
                        <service.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <p className="text-sm text-gray-500 mb-3">{service.providers} providers</p>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <Button 
                          variant="outline" 
                          className="text-sm"
                          onClick={() => setLocation(`/services/${service.id}`)}
                        >
                          Find Providers
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredServices.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No services found matching your criteria</p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearchTerm("");
                      setCategory("all");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="categories">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map(category => (
                  <div 
                    key={category.id} 
                    className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      setCategory(category.id);
                      document.querySelector('[data-value="services"]')?.click();
                    }}
                  >
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${category.color}`}>
                        <category.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{category.name}</h3>
                        <p className="text-sm text-gray-500">
                          {services.filter(s => s.category === category.id).length} services
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="popular">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services
                  .sort((a, b) => b.providers - a.providers)
                  .slice(0, 6)
                  .map(service => (
                    <div key={service.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${service.color}`}>
                          <service.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{service.name}</h3>
                          <p className="text-sm text-gray-500 mb-3">{service.providers} providers</p>
                          <p className="text-gray-600 mb-4">{service.description}</p>
                          <Button 
                            variant="outline" 
                            className="text-sm"
                            onClick={() => setLocation(`/services/${service.id}`)}
                          >
                            Find Providers
                          </Button>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 px-4 border-t border-gray-200">
        <div className="container mx-auto text-center">
          <p className="text-gray-500">© 2023 Namibian Service Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
