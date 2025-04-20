
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
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MapPin, Search, X, Plus, Map } from "lucide-react";

export default function ServiceLocations() {
  const [activeTab, setActiveTab] = useState("regions");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for Namibian regions and cities
  const locations = {
    regions: [
      { id: 1, name: "Khomas", selected: true },
      { id: 2, name: "Erongo", selected: false },
      { id: 3, name: "Hardap", selected: false },
      { id: 4, name: "Karas", selected: false },
      { id: 5, name: "Kunene", selected: false },
      { id: 6, name: "Ohangwena", selected: false },
      { id: 7, name: "Omaheke", selected: false },
      { id: 8, name: "Omusati", selected: false },
      { id: 9, name: "Oshana", selected: true },
      { id: 10, name: "Oshikoto", selected: false },
      { id: 11, name: "Otjozondjupa", selected: false },
      { id: 12, name: "Zambezi", selected: false },
      { id: 13, name: "Kavango East", selected: false },
      { id: 14, name: "Kavango West", selected: false },
    ],
    cities: [
      { id: 1, name: "Windhoek", regionId: 1, selected: true },
      { id: 2, name: "Swakopmund", regionId: 2, selected: false },
      { id: 3, name: "Walvis Bay", regionId: 2, selected: false },
      { id: 4, name: "Oshakati", regionId: 9, selected: true },
      { id: 5, name: "Ondangwa", regionId: 9, selected: true },
      { id: 6, name: "Rundu", regionId: 13, selected: false },
      { id: 7, name: "Katima Mulilo", regionId: 12, selected: false },
      { id: 8, name: "Keetmanshoop", regionId: 4, selected: false },
      { id: 9, name: "Mariental", regionId: 3, selected: false },
      { id: 10, name: "Gobabis", regionId: 7, selected: false },
      { id: 11, name: "Otjiwarongo", regionId: 11, selected: false },
      { id: 12, name: "Okahandja", regionId: 11, selected: false },
    ]
  };

  // Filter locations based on search query
  const filteredRegions = locations.regions.filter(
    region => region.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredCities = locations.cities.filter(
    city => city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle selection of a location
  const toggleLocationSelection = (type: string, id: number) => {
    if (type === 'regions') {
      // In a real implementation, this would update the state
      alert(`Region #${id} selection toggled`);
    } else {
      // In a real implementation, this would update the state
      alert(`City #${id} selection toggled`);
    }
  };

  // Save location settings
  const saveLocationSettings = () => {
    alert("Service location settings saved!");
    // In a real implementation, this would send the data to your backend
  };

  // Get selected locations
  const selectedRegions = locations.regions.filter(region => region.selected);
  const selectedCities = locations.cities.filter(city => city.selected);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Locations</CardTitle>
        <CardDescription>
          Define the regions and cities where you offer your services.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 text-blue-800 p-4 rounded-md">
          <div className="flex">
            <MapPin className="h-5 w-5 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium">Your Service Area</h3>
              <p className="text-sm">
                Select regions or specific cities where you're available to provide services. 
                This helps customers find you when searching in their area.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search regions or cities..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="regions" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="regions">Regions</TabsTrigger>
                <TabsTrigger value="cities">Cities</TabsTrigger>
              </TabsList>
              
              <TabsContent value="regions" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {filteredRegions.length > 0 ? (
                    filteredRegions.map((region) => (
                      <div key={region.id} className="flex items-center space-x-2 p-2 border rounded hover:bg-slate-50">
                        <Checkbox 
                          id={`region-${region.id}`} 
                          checked={region.selected}
                          onCheckedChange={() => toggleLocationSelection('regions', region.id)}
                        />
                        <Label htmlFor={`region-${region.id}`} className="flex-1 cursor-pointer">
                          {region.name}
                        </Label>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-4 text-muted-foreground">
                      No regions found matching your search.
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="cities" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city) => (
                      <div key={city.id} className="flex items-center space-x-2 p-2 border rounded hover:bg-slate-50">
                        <Checkbox 
                          id={`city-${city.id}`} 
                          checked={city.selected}
                          onCheckedChange={() => toggleLocationSelection('cities', city.id)}
                        />
                        <Label htmlFor={`city-${city.id}`} className="flex-1 cursor-pointer">
                          {city.name}
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          {locations.regions.find(r => r.id === city.regionId)?.name}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-4 text-muted-foreground">
                      No cities found matching your search.
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="w-full md:w-1/3 border rounded-md p-4">
            <h3 className="font-medium mb-3">Selected Service Areas</h3>
            
            {selectedRegions.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Regions</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRegions.map((region) => (
                    <Badge 
                      key={region.id} 
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {region.name}
                      <button 
                        className="ml-1 h-3 w-3 rounded-full"
                        onClick={() => toggleLocationSelection('regions', region.id)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {selectedCities.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Cities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCities.map((city) => (
                    <Badge 
                      key={city.id} 
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {city.name}
                      <button 
                        className="ml-1 h-3 w-3 rounded-full"
                        onClick={() => toggleLocationSelection('cities', city.id)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedRegions.length === 0 && selectedCities.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No service areas selected.</p>
                <p className="text-sm">Select regions or cities to define your service area.</p>
              </div>
            )}

            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full">
                <Map className="h-4 w-4 mr-2" />
                View on Map
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between space-x-2 p-3 rounded-lg border">
          <div>
            <h4 className="font-medium">Service Radius</h4>
            <p className="text-sm text-muted-foreground">
              Willing to travel up to a certain distance?
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              defaultValue="25"
              className="w-20"
            />
            <span>km</span>
            <Button variant="outline">Set Radius</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline">Reset</Button>
        <Button onClick={saveLocationSettings}>Save Locations</Button>
      </CardFooter>
    </Card>
  );
}
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Plus, Trash2, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ServiceLocations() {
  // Mock data - in a real app, this would come from API
  const [regions, setRegions] = useState([
    { id: 1, name: "Khomas", selected: true },
    { id: 2, name: "Erongo", selected: false },
    { id: 3, name: "Oshana", selected: false },
    { id: 4, name: "Otjozondjupa", selected: false },
    { id: 5, name: "Hardap", selected: false },
  ]);
  
  const [cities, setCities] = useState([
    { id: 1, regionId: 1, name: "Windhoek", selected: true },
    { id: 2, regionId: 1, name: "Ongos", selected: false },
    { id: 3, regionId: 2, name: "Swakopmund", selected: false },
    { id: 4, regionId: 2, name: "Walvis Bay", selected: false },
    { id: 5, regionId: 3, name: "Oshakati", selected: false },
    { id: 6, regionId: 3, name: "Ondangwa", selected: false },
  ]);
  
  const [customAreas, setCustomAreas] = useState([
    { id: 1, name: "Windhoek Central", travelCharge: 0 },
    { id: 2, name: "Khomasdal", travelCharge: 50 },
    { id: 3, name: "Katutura", travelCharge: 80 },
  ]);
  
  const [newArea, setNewArea] = useState({ name: "", travelCharge: 0 });
  
  const toggleRegion = (regionId) => {
    setRegions(regions.map(region => 
      region.id === regionId ? { ...region, selected: !region.selected } : region
    ));
  };
  
  const toggleCity = (cityId) => {
    setCities(cities.map(city => 
      city.id === cityId ? { ...city, selected: !city.selected } : city
    ));
  };
  
  const addCustomArea = () => {
    if (newArea.name.trim()) {
      setCustomAreas([
        ...customAreas,
        { 
          id: customAreas.length + 1, 
          name: newArea.name, 
          travelCharge: Number(newArea.travelCharge) 
        }
      ]);
      setNewArea({ name: "", travelCharge: 0 });
    }
  };
  
  const removeCustomArea = (areaId) => {
    setCustomAreas(customAreas.filter(area => area.id !== areaId));
  };
  
  const updateTravelCharge = (areaId, charge) => {
    setCustomAreas(customAreas.map(area => 
      area.id === areaId ? { ...area, travelCharge: Number(charge) } : area
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Service Locations
          </CardTitle>
          <CardDescription>
            Select the regions and cities where you offer your services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Regions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {regions.map((region) => (
                <div key={region.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`region-${region.id}`}
                    checked={region.selected}
                    onCheckedChange={() => toggleRegion(region.id)}
                  />
                  <Label htmlFor={`region-${region.id}`}>{region.name}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Cities & Towns</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {cities.map((city) => (
                <div key={city.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`city-${city.id}`}
                    checked={city.selected}
                    onCheckedChange={() => toggleCity(city.id)}
                    disabled={!regions.find(r => r.id === city.regionId)?.selected}
                  />
                  <Label 
                    htmlFor={`city-${city.id}`}
                    className={!regions.find(r => r.id === city.regionId)?.selected ? "text-muted-foreground" : ""}
                  >
                    {city.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Locations
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Custom Service Areas</CardTitle>
          <CardDescription>
            Define specific areas and travel charges if applicable
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customAreas.map((area) => (
              <div key={area.id} className="flex items-center justify-between border-b pb-3">
                <div className="font-medium">{area.name}</div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">Travel charge:</span>
                    <Input 
                      type="number" 
                      className="w-20 h-8"
                      value={area.travelCharge}
                      onChange={(e) => updateTravelCharge(area.id, e.target.value)}
                    />
                    <span className="text-sm text-muted-foreground ml-1">N$</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeCustomArea(area.id)}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="flex items-center gap-2 pt-2">
              <Input 
                placeholder="Area name"
                value={newArea.name}
                onChange={(e) => setNewArea({ ...newArea, name: e.target.value })}
              />
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">Travel charge:</span>
                <Input 
                  type="number" 
                  className="w-20"
                  value={newArea.travelCharge}
                  onChange={(e) => setNewArea({ ...newArea, travelCharge: e.target.value })}
                />
                <span className="text-sm text-muted-foreground ml-1">N$</span>
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={addCustomArea}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between items-center w-full">
            <div className="text-sm text-muted-foreground">
              Travel charges are applied based on service location
            </div>
            <Button>Save Changes</Button>
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Travel Distance</CardTitle>
          <CardDescription>
            Set how far you're willing to travel for services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Maximum Travel Distance</h4>
                <p className="text-sm text-muted-foreground">How far are you willing to travel for a service</p>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="25">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100+</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">km</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Base Travel Charge</h4>
                <p className="text-sm text-muted-foreground">Default charge for travel expenses</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm text-muted-foreground">N$</span>
                <Input type="number" defaultValue="50" className="w-20" />
                <span className="text-sm text-muted-foreground">per 10km</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
