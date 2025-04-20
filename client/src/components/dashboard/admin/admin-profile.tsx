
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
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Camera, Shield, Mail, Phone, User } from "lucide-react";
import { User as UserType } from "@shared/schema";

interface AdminProfileProps {
  user: UserType | null;
}

export default function AdminProfile({ user }: AdminProfileProps) {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [bio, setBio] = useState("");
  
  const handleSaveProfile = () => {
    // Handle profile save logic (to be implemented with API)
    alert("Profile updated successfully");
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Profile</CardTitle>
          <CardDescription>
            Manage your personal information and account settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.profileImage || ""} alt="Profile" />
                  <AvatarFallback>
                    {user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : "AD"}
                  </AvatarFallback>
                </Avatar>
                <Button size="icon" className="rounded-full absolute -bottom-2 -right-2 h-8 w-8" variant="secondary">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-semibold">
                  {user ? `${user.firstName} ${user.lastName}` : "Admin User"}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 mr-1" />
                  <span>Administrator</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Member since {user ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>

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

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Brief description about yourself..." 
                  className="resize-none h-24"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
