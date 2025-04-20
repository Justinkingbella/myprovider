
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
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
import { User as UserType } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Camera, Check, MapPin, CircleDollarSign, Clock, CreditCard, FileCheck, User, Mail, Phone, Calendar, Briefcase } from "lucide-react";

interface ProviderProfileProps {
  user: UserType | null;
}

export default function ProviderProfile({ user }: ProviderProfileProps) {
  const [profileTab, setProfileTab] = useState("basic");

  // Form states for profile details
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [businessName, setBusinessName] = useState("John's Handyman Services");
  const [description, setDescription] = useState("Professional handyman services with over 5 years of experience. Specializing in home repairs, furniture assembly, and general maintenance.");
  const [phone, setPhone] = useState(user?.phone || "+264 81 123 4567");
  const [hourlyRate, setHourlyRate] = useState("250");
  const [locations, setLocations] = useState(["Windhoek", "Swakopmund"]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [availableDays, setAvailableDays] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("17:00");
  const [bankName, setBankName] = useState("First National Bank");
  const [accountNumber, setAccountNumber] = useState("62123456789");
  const [branchCode, setBranchCode] = useState("280172");

  // Mock data for regions in Namibia
  const namibianRegions = [
    "Erongo", "Hardap", "Karas", "Kavango East", "Kavango West", 
    "Khomas", "Kunene", "Ohangwena", "Omaheke", "Omusati", 
    "Oshana", "Oshikoto", "Otjozondjupa", "Zambezi"
  ];

  const handleSaveProfile = () => {
    // Save profile logic goes here
    alert("Profile saved successfully!");
  };

  const handleAddLocation = () => {
    if (selectedLocation && !locations.includes(selectedLocation)) {
      setLocations([...locations, selectedLocation]);
      setSelectedLocation("");
    }
  };

  const handleRemoveLocation = (loc: string) => {
    setLocations(locations.filter(location => location !== loc));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Provider Profile</CardTitle>
          <CardDescription>
            Manage your business profile information that will be visible to customers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.profileImage || "https://randomuser.me/api/portraits/men/42.jpg"} alt="Profile" />
                  <AvatarFallback>
                    {user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : "SP"}
                  </AvatarFallback>
                </Avatar>
                <Button size="icon" className="rounded-full absolute -bottom-2 -right-2 h-8 w-8" variant="secondary">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-semibold">{businessName || "Your Business Name"}</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Handyman</Badge>
                  <Badge variant="outline">Repair</Badge>
                  <Badge variant="outline">Installation</Badge>
                  <Badge variant="outline" className="bg-green-100">
                    <Check className="h-3 w-3 mr-1" /> Verified
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Member since {user ? new Date(user.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <Tabs defaultValue="basic" value={profileTab} onValueChange={setProfileTab} className="w-full">
              <TabsList className="grid grid-cols-1 md:grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="services">Service Areas</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
                <TabsTrigger value="payment">Payment Details</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first-name">First Name</Label>
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="first-name" 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="last-name">Last Name</Label>
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="last-name" 
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Email changes are managed through authentication settings.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="business-name">Business Name</Label>
                      <div className="flex items-center">
                        <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="business-name" 
                          placeholder="Your business name"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="phone" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+264 XX XXX XXXX"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe your business and services..." 
                      className="resize-none h-32"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Provide a detailed description of your services, experience, and specialties.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="rate">Hourly Rate (N$)</Label>
                    <div className="flex items-center">
                      <CircleDollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="rate" 
                        placeholder="0.00" 
                        type="number"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      This is your default hourly rate. You can set different rates for specific services.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="services" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="service-areas">Service Areas</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Select regions where you offer your services.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {locations.map((loc) => (
                        <Badge key={loc} className="flex items-center gap-1 bg-blue-100 text-blue-800">
                          <MapPin className="h-3 w-3" />
                          {loc}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-4 w-4 p-0 ml-1 text-blue-800 hover:bg-blue-200"
                            onClick={() => handleRemoveLocation(loc)}
                          >
                            ×
                          </Button>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a region" />
                        </SelectTrigger>
                        <SelectContent>
                          {namibianRegions.map((region) => (
                            <SelectItem key={region} value={region}>{region}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button onClick={handleAddLocation}>Add</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="availability" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div>
                    <Label>Working Days</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id={`day-${day}`} 
                            checked={availableDays.includes(day)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setAvailableDays([...availableDays, day]);
                              } else {
                                setAvailableDays(availableDays.filter(d => d !== day));
                              }
                            }}
                            className="form-checkbox h-4 w-4 text-primary"
                          />
                          <Label htmlFor={`day-${day}`} className="font-normal">{day}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-time">Start Time</Label>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="start-time" 
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="end-time">End Time</Label>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="end-time" 
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payment" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bank-name">Bank Name</Label>
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="bank-name" 
                        placeholder="Your bank name"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="account-number">Account Number</Label>
                      <Input 
                        id="account-number" 
                        placeholder="Your account number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="branch-code">Branch Code</Label>
                      <Input 
                        id="branch-code" 
                        placeholder="Your branch code"
                        value={branchCode}
                        onChange={(e) => setBranchCode(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 mt-2">
                    <FileCheck className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Your payment details are securely stored and only used for processing payouts. 
                      We will never share this information with third parties.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSaveProfile}>Save Profile</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
