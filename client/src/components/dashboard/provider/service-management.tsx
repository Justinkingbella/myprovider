
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  DollarSign, 
  Clock, 
  Tag
} from "lucide-react";

export default function ServiceManagement() {
  const [activeTab, setActiveTab] = useState("active");
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);

  // Form state for adding/editing service
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [priceType, setPriceType] = useState("hourly");
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Mock data for services
  const services = [
    {
      id: 1,
      title: "Home Cleaning",
      category: "Cleaning",
      description: "Complete home cleaning service including dusting, mopping, and bathroom cleaning.",
      priceType: "hourly",
      price: 200,
      isActive: true
    },
    {
      id: 2,
      title: "Furniture Assembly",
      category: "Handyman",
      description: "Assembly of all types of furniture including beds, cabinets, tables, and chairs.",
      priceType: "fixed",
      price: 350,
      isActive: true
    },
    {
      id: 3,
      title: "Electrical Repair",
      category: "Electrical",
      description: "Repairs for electrical issues, outlets, switches, and circuit breakers.",
      priceType: "hourly",
      price: 250,
      isActive: true
    },
    {
      id: 4,
      title: "Plumbing",
      category: "Plumbing",
      description: "Repairs for leaks, clogs, and other plumbing issues.",
      priceType: "hourly",
      price: 300,
      isActive: false
    }
  ];

  // Mock data for categories
  const categories = [
    "Cleaning", "Handyman", "Electrical", "Plumbing", "Gardening", 
    "Moving", "Painting", "Carpentry", "Beauty & Wellness", "Pet Care"
  ];

  // Filter services based on active tab
  const filteredServices = activeTab === "active" 
    ? services.filter(service => service.isActive)
    : services.filter(service => !service.isActive);

  const handleAddNewService = () => {
    setIsAddingService(true);
    resetForm();
  };

  const handleEditService = (serviceId: number) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setServiceTitle(service.title);
      setServiceCategory(service.category);
      setServiceDescription(service.description);
      setPriceType(service.priceType);
      setPrice(service.price.toString());
      setIsActive(service.isActive);
      setEditingServiceId(serviceId);
      setIsAddingService(true);
    }
  };

  const handleDeleteService = (serviceId: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      alert(`Service #${serviceId} deleted`);
      // In a real implementation, this would delete the service from the database
    }
  };

  const handleToggleServiceStatus = (serviceId: number, currentStatus: boolean) => {
    alert(`Service #${serviceId} ${currentStatus ? 'deactivated' : 'activated'}`);
    // In a real implementation, this would update the service status in the database
  };

  const resetForm = () => {
    setServiceTitle("");
    setServiceCategory("");
    setServiceDescription("");
    setPriceType("hourly");
    setPrice("");
    setIsActive(true);
    setEditingServiceId(null);
  };

  const handleCancelForm = () => {
    setIsAddingService(false);
    resetForm();
  };

  const handleSubmitForm = () => {
    if (!serviceTitle || !serviceCategory || !price) {
      alert("Please fill in all required fields");
      return;
    }
    
    if (editingServiceId) {
      alert(`Service #${editingServiceId} updated`);
    } else {
      alert(`New service added: ${serviceTitle}`);
    }
    
    setIsAddingService(false);
    resetForm();
    // In a real implementation, this would add/update the service in the database
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Service Management</CardTitle>
            <CardDescription>
              Manage your service offerings and pricing.
            </CardDescription>
          </div>
          {!isAddingService && (
            <Button onClick={handleAddNewService}>
              <Plus className="h-4 w-4 mr-1" />
              Add New Service
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isAddingService ? (
          <Card>
            <CardHeader>
              <CardTitle>{editingServiceId ? "Edit Service" : "Add New Service"}</CardTitle>
              <CardDescription>
                {editingServiceId 
                  ? "Update your service details and pricing"
                  : "Create a new service offering for your customers"
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service-title">Service Title *</Label>
                  <Input 
                    id="service-title" 
                    placeholder="e.g., Home Cleaning"
                    value={serviceTitle}
                    onChange={(e) => setServiceTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-category">Category *</Label>
                  <Select value={serviceCategory} onValueChange={setServiceCategory}>
                    <SelectTrigger id="service-category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service-description">Description</Label>
                <Textarea 
                  id="service-description" 
                  placeholder="Describe your service in detail..."
                  className="resize-none h-20"
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Pricing Type</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="price-hourly" 
                      name="price-type"
                      checked={priceType === "hourly"}
                      onChange={() => setPriceType("hourly")}
                      className="form-radio h-4 w-4 text-primary"
                    />
                    <Label htmlFor="price-hourly" className="font-normal">Hourly Rate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="price-fixed" 
                      name="price-type"
                      checked={priceType === "fixed"}
                      onChange={() => setPriceType("fixed")}
                      className="form-radio h-4 w-4 text-primary"
                    />
                    <Label htmlFor="price-fixed" className="font-normal">Fixed Price</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service-price">Price (N$) *</Label>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input 
                    id="service-price" 
                    placeholder="0.00" 
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {priceType === "hourly" 
                    ? "This is your hourly rate for this service."
                    : "This is the fixed price for this service regardless of time spent."
                  }
                </p>
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="service-active">Active Status</Label>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="service-active" 
                    checked={isActive}
                    onCheckedChange={setIsActive}
                  />
                  <span className="text-sm">{isActive ? "Active" : "Inactive"}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancelForm}>
                Cancel
              </Button>
              <Button onClick={handleSubmitForm}>
                {editingServiceId ? "Update Service" : "Add Service"}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <>
            <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="active">Active Services</TabsTrigger>
                <TabsTrigger value="inactive">Inactive Services</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="space-y-4 pt-4">
                {filteredServices.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Pricing</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredServices.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell className="font-medium">
                            <div>
                              <div className="font-medium">{service.title}</div>
                              <div className="text-sm text-muted-foreground truncate max-w-xs">
                                {service.description}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {service.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {service.priceType === "hourly" ? (
                                <>
                                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span>N${service.price}/hr</span>
                                </>
                              ) : (
                                <>
                                  <Tag className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span>N${service.price}</span>
                                </>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Switch 
                              checked={service.isActive}
                              onCheckedChange={() => handleToggleServiceStatus(service.id, service.isActive)}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleEditService(service.id)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDeleteService(service.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 border rounded-md">
                    <p className="text-muted-foreground mb-4">
                      {activeTab === "active" 
                        ? "You don't have any active services." 
                        : "You don't have any inactive services."
                      }
                    </p>
                    <Button onClick={handleAddNewService}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Service
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </CardContent>
    </Card>
  );
}
