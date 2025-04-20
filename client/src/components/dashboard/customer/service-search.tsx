import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Slider,
  SliderTrack,
  SliderRange,
  SliderThumb,
} from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Search, Filter, MapPin, Clock, Star, Heart, Calendar, ArrowRight, Home, Grid, List } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export default function ServiceSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [viewType, setViewType] = useState("grid");
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  // Mock data for categories
  const categories = [
    { id: 1, name: "Home Cleaning", icon: "🧹" },
    { id: 2, name: "Plumbing", icon: "🔧" },
    { id: 3, name: "Electrical", icon: "⚡" },
    { id: 4, name: "Garden & Outdoor", icon: "🌱" },
    { id: 5, name: "Personal Errands", icon: "🛍️" },
    { id: 6, name: "Beauty & Wellness", icon: "💅" },
  ];

  // Mock data for locations
  const locations = [
    "Windhoek", "Swakopmund", "Walvis Bay", "Oshakati", "Ondangwa", "Rundu", "Katima Mulilo"
  ];

  // Mock data for services
  const services = [
    { 
      id: 1, 
      title: "Home Deep Cleaning", 
      category: "Home Cleaning", 
      provider: "CleanCo Services", 
      location: "Windhoek", 
      price: 350, 
      priceType: "hourly", 
      rating: 4.8, 
      reviews: 42,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    { 
      id: 2, 
      title: "Plumbing Repairs", 
      category: "Plumbing", 
      provider: "Express Plumbers", 
      location: "Windhoek", 
      price: 450, 
      priceType: "hourly", 
      rating: 4.5, 
      reviews: 38,
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    { 
      id: 3, 
      title: "Electrical Installations", 
      category: "Electrical", 
      provider: "PowerPro Electrical", 
      location: "Swakopmund", 
      price: 500, 
      priceType: "hourly", 
      rating: 4.9, 
      reviews: 27,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    { 
      id: 4, 
      title: "Garden Maintenance", 
      category: "Garden & Outdoor", 
      provider: "Green Thumb Gardening", 
      location: "Windhoek", 
      price: 300, 
      priceType: "hourly", 
      rating: 4.7, 
      reviews: 31,
      image: "https://images.unsplash.com/photo-1599629954295-8f7ad2ff344d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    { 
      id: 5, 
      title: "Grocery Shopping", 
      category: "Personal Errands", 
      provider: "QuickRun Errands", 
      location: "Windhoek", 
      price: 200, 
      priceType: "hourly", 
      rating: 4.6, 
      reviews: 53,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    { 
      id: 6, 
      title: "Hair Styling", 
      category: "Beauty & Wellness", 
      provider: "Glam Studio", 
      location: "Swakopmund", 
      price: 600, 
      priceType: "fixed", 
      rating: 4.9, 
      reviews: 87,
      image: "https://images.unsplash.com/photo-1560869713-2cc18e9ac273?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
  ];

  const handleViewServiceDetails = (service: any) => {
    setSelectedService(service);
    setOpenDetails(true);
  };

  const handleBookService = (service: any) => {
    // Booking logic would go here
    alert(`Booking ${service.title} service...`);
  };

  const filteredServices = services.filter(service => {
    // Filter by search query
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by category
    const matchesCategory = !category || service.category === category;

    // Filter by location
    const matchesLocation = !location || service.location === location;

    // Filter by price range
    const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  const formatPrice = (price: number, type: string) => {
    return `N$${price}${type === 'hourly' ? '/hr' : ''}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Services</CardTitle>
          <CardDescription>
            Search for services in your area based on your specific needs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Search bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setViewType("grid")} className={viewType === "grid" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}>
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setViewType("list")} className={viewType === "list" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}>
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="category-filter">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category-filter">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.icon} {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location-filter">Location</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location-filter">
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All locations</SelectItem>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price-filter">Price Range (N$)</Label>
                <div className="pt-4 px-2">
                  <Slider 
                    defaultValue={[0, 1000]} 
                    max={1000} 
                    step={50} 
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>N${priceRange[0]}</span>
                    <span>N${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="urgent-filter" 
                    checked={urgentOnly}
                    onCheckedChange={(checked) => setUrgentOnly(checked as boolean)}
                  />
                  <Label htmlFor="urgent-filter">Urgent services only</Label>
                </div>
              </div>
            </div>

            {/* Results - Grid View */}
            {viewType === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                {filteredServices.map((service) => (
                  <Card key={service.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Badge variant="outline">{service.category}</Badge>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-sm font-medium">{service.rating}</span>
                            <span className="text-xs text-muted-foreground ml-1">({service.reviews})</span>
                          </div>
                        </div>
                        <h3 className="font-semibold">{service.title}</h3>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {service.location}
                          </div>
                          <div className="font-medium">
                            {formatPrice(service.price, service.priceType)}
                          </div>
                        </div>
                        <div className="text-sm">{service.provider}</div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1" 
                        onClick={() => handleViewServiceDetails(service)}
                      >
                        Details
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1" 
                        onClick={() => handleBookService(service)}
                      >
                        Book Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            {/* Results - List View */}
            {viewType === "list" && (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredServices.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                          No services found matching your criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredServices.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                                <img 
                                  src={service.image} 
                                  alt={service.title} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium">{service.title}</div>
                                <div className="text-xs text-muted-foreground">{service.category}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{service.provider}</TableCell>
                          <TableCell>{service.location}</TableCell>
                          <TableCell>{formatPrice(service.price, service.priceType)}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                              <span>{service.rating}</span>
                              <span className="text-xs text-muted-foreground ml-1">({service.reviews})</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleViewServiceDetails(service)}
                              >
                                Details
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => handleBookService(service)}
                              >
                                Book
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Service details dialog */}
      <Dialog open={openDetails} onOpenChange={setOpenDetails}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedService?.title}</DialogTitle>
            <DialogDescription>
              Service details and booking options
            </DialogDescription>
          </DialogHeader>

          {selectedService && (
            <div className="space-y-4">
              <div className="aspect-video w-full overflow-hidden rounded-md">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Provider</div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>{selectedService.provider[0]}</AvatarFallback>
                    </Avatar>
                    <span>{selectedService.provider}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Category</div>
                  <Badge variant="outline">{selectedService.category}</Badge>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Location</div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    {selectedService.location}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Price</div>
                  <div className="font-semibold">
                    {formatPrice(selectedService.price, selectedService.priceType)}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Rating</div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{selectedService.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      ({selectedService.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Description</div>
                <p className="text-sm">
                  Professional {selectedService.title.toLowerCase()} service by {selectedService.provider}.
                  We provide high quality service with experienced professionals. 
                  Our team is fully equipped and trained to handle all your {selectedService.category.toLowerCase()} needs.
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button variant="outline" className="flex-1">
              <Heart className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button className="flex-1" onClick={() => handleBookService(selectedService)}>
              <Calendar className="mr-2 h-4 w-4" />
              Book Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}