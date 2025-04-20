import { useState } from "react";
import { User } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Briefcase, 
  DollarSign,
  Building,
  FileText,
  Link
} from "lucide-react";


interface ProviderProfileProps {
  user?: User;
}

export default function ProviderProfile({ user }: ProviderProfileProps) {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [hourlyRate, setHourlyRate] = useState("150");
  const [website, setWebsite] = useState("");
  const [profileVisible, setProfileVisible] = useState(true);

  const handleSaveProfile = () => {
    // Handle profile save logic (to be implemented with API)
    alert("Profile updated successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Provider Profile</CardTitle>
          <CardDescription>
            Manage your professional profile visible to customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.profileImage || ""} alt="Profile" />
                  <AvatarFallback>
                    {user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : "SP"}
                  </AvatarFallback>
                </Avatar>
                <Button size="icon" className="rounded-full absolute -bottom-2 -right-2 h-8 w-8" variant="secondary">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first-name">First Name</Label>
                    <div className="flex items-center">
                      <UserIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="first-name" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input 
                      id="last-name" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
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
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Business Information</h3>

              <div>
                <Label htmlFor="business-name">Business Name</Label>
                <div className="flex items-center">
                  <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="business-name" 
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Your business name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="business-description">Business Description</Label>
                <div className="flex items-start">
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground mt-2" />
                  <Textarea 
                    id="business-description" 
                    value={businessDescription}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                    placeholder="Describe your business and services..." 
                    className="resize-none h-24"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hourly-rate">Default Hourly Rate (N$)</Label>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="hourly-rate" 
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Website (optional)</Label>
                  <div className="flex items-center">
                    <Link className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="website" 
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://www.yourwebsite.com"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch 
                  id="profile-visibility"
                  checked={profileVisible}
                  onCheckedChange={setProfileVisible}
                />
                <Label htmlFor="profile-visibility">Make profile visible to customers</Label>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSaveProfile}>Save Profile</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}