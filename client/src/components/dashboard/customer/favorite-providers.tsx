
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
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star, Heart, MapPin, Phone, Mail, Calendar, Search, Trash2, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function FavoriteProviders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [providerDetailsOpen, setProviderDetailsOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  // Mock data for favorite providers
  const favoriteProviders = [
    {
      id: 1,
      name: "CleanCo Services",
      category: "Home Cleaning",
      profileImage: "https://i.pravatar.cc/150?img=1",
      rating: 4.8,
      reviews: 42,
      location: "Windhoek",
      phone: "+264 81 123 4567",
      email: "contact@cleanco.com",
      description: "Professional home cleaning services with over 10 years of experience.",
      services: ["Deep Cleaning", "Regular Cleaning", "Move-in/Move-out Cleaning"]
    },
    {
      id: 2,
      name: "Express Plumbers",
      category: "Plumbing",
      profileImage: "https://i.pravatar.cc/150?img=2",
      rating: 4.5,
      reviews: 38,
      location: "Windhoek",
      phone: "+264 81 456 7890",
      email: "info@expressplumbers.com",
      description: "Fast and reliable plumbing services for all your needs.",
      services: ["Plumbing Repairs", "Pipe Installation", "Drain Cleaning"]
    },
    {
      id: 3,
      name: "Green Thumb Gardening",
      category: "Garden & Outdoor",
      profileImage: "https://i.pravatar.cc/150?img=3",
      rating: 4.7,
      reviews: 31,
      location: "Windhoek",
      phone: "+264 81 789 1234",
      email: "contact@greenthumb.com",
      description: "We keep your garden looking beautiful all year round.",
      services: ["Garden Maintenance", "Lawn Care", "Landscaping"]
    },
  ];

  const handleViewProvider = (provider: any) => {
    setSelectedProvider(provider);
    setProviderDetailsOpen(true);
  };

  const handleRemoveFavorite = (provider: any) => {
    setSelectedProvider(provider);
    setConfirmDeleteOpen(true);
  };

  const confirmRemoveFavorite = () => {
    // In a real app, this would send a request to the backend
    alert(`Removed ${selectedProvider.name} from favorites`);
    setConfirmDeleteOpen(false);
  };

  const handleBookNow = (provider: any) => {
    // In a real app, this would navigate to the booking page
    alert(`Booking service with ${provider.name}`);
  };

  const filteredProviders = favoriteProviders.filter(provider => 
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Favorite Providers</CardTitle>
        <CardDescription>
          View and manage your saved service providers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your favorites..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {filteredProviders.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            {searchQuery 
              ? "No providers found matching your search." 
              : "You haven't added any favorite providers yet."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProviders.map((provider) => (
              <Card key={provider.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={provider.profileImage} alt={provider.name} />
                      <AvatarFallback>{provider.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{provider.name}</h3>
                      <div className="flex items-center text-sm">
                        <Badge variant="outline" className="mr-2">{provider.category}</Badge>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{provider.rating}</span>
                          <span className="text-xs text-muted-foreground ml-1">({provider.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    {provider.location}
                  </div>
                  
                  <p className="text-sm line-clamp-2 mb-4">{provider.description}</p>
                  
                  <div className="flex justify-between gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewProvider(provider)}
                    >
                      View Details
                    </Button>
                    <Button 
                      size="sm"
                      className="flex-1"
                      onClick={() => handleBookNow(provider)}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
      
      {/* Provider details dialog */}
      <Dialog open={providerDetailsOpen} onOpenChange={setProviderDetailsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Provider Details</DialogTitle>
            <DialogDescription>
              View information about this service provider.
            </DialogDescription>
          </DialogHeader>
          
          {selectedProvider && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedProvider.profileImage} alt={selectedProvider.name} />
                  <AvatarFallback>{selectedProvider.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{selectedProvider.name}</h2>
                  <Badge variant="outline">{selectedProvider.category}</Badge>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{selectedProvider.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">({selectedProvider.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedProvider.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedProvider.phone}</span>
                </div>
                <div className="flex items-center gap-2 md:col-span-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedProvider.email}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">About</h3>
                <p className="text-sm">{selectedProvider.description}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProvider.services.map((service: string, index: number) => (
                    <Badge key={index} variant="secondary">{service}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button 
              variant="outline" 
              onClick={() => {
                setProviderDetailsOpen(false);
                handleRemoveFavorite(selectedProvider);
              }}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-1"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Favorite
            </Button>
            <Button 
              onClick={() => {
                setProviderDetailsOpen(false);
                handleBookNow(selectedProvider);
              }}
              className="flex-1"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Confirm delete dialog */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove from Favorites</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {selectedProvider?.name} from your favorites?
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setConfirmDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmRemoveFavorite}
            >
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
