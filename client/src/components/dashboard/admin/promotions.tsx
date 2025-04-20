
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Percent, 
  Tag, 
  Calendar, 
  Gift, 
  Users, 
  DollarSign, 
  Trash, 
  Plus, 
  Edit, 
  Search,
  Star,
  RefreshCcw,
  Sparkles
} from "lucide-react";

// Mock data for promotions
const promotions = [
  {
    id: 1,
    name: "Summer Special",
    type: "discount",
    value: "20%",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    status: "active",
    target: "all",
    usageCount: 452
  },
  {
    id: 2,
    name: "New User Bonus",
    type: "credit",
    value: "N$100",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    status: "active",
    target: "new-users",
    usageCount: 891
  },
  {
    id: 3,
    name: "Referral Reward",
    type: "discount",
    value: "15%",
    startDate: "2023-03-15",
    endDate: "2023-09-15",
    status: "active",
    target: "referrals",
    usageCount: 317
  },
  {
    id: 4,
    name: "Holiday Special",
    type: "discount",
    value: "25%",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    status: "scheduled",
    target: "all",
    usageCount: 0
  },
  {
    id: 5,
    name: "Weekend Deal",
    type: "discount",
    value: "10%",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    status: "active",
    target: "weekends",
    usageCount: 728
  }
];

// Mock data for coupons
const coupons = [
  {
    id: 1,
    code: "WELCOME25",
    discount: "25%",
    validUntil: "2023-12-31",
    usageLimit: 1000,
    usageCount: 458,
    status: "active"
  },
  {
    id: 2,
    code: "LOYAL10",
    discount: "10%",
    validUntil: "2023-09-30",
    usageLimit: 500,
    usageCount: 276,
    status: "active"
  },
  {
    id: 3,
    code: "FLASH50",
    discount: "50%",
    validUntil: "2023-07-15",
    usageLimit: 200,
    usageCount: 200,
    status: "expired"
  },
  {
    id: 4,
    code: "PREMIUM20",
    discount: "20%",
    validUntil: "2023-12-31",
    usageLimit: 300,
    usageCount: 112,
    status: "active"
  }
];

const Promotions = () => {
  const [activeTab, setActiveTab] = useState("discounts");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter function for promotions
  const filteredPromotions = promotions.filter(promo => 
    promo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    promo.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    promo.target.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter function for coupons
  const filteredCoupons = coupons.filter(coupon => 
    coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coupon.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Promotions & Coupons</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search promotions..."
              className="w-[250px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Promotion</DialogTitle>
                <DialogDescription>
                  Create a new promotion, discount, or coupon code for your customers.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="promotion-type" className="text-right">
                    Type
                  </Label>
                  <Select defaultValue="discount">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="discount">Discount</SelectItem>
                      <SelectItem value="coupon">Coupon Code</SelectItem>
                      <SelectItem value="credit">Account Credit</SelectItem>
                      <SelectItem value="freeservice">Free Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" placeholder="Summer Special" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="value" className="text-right">
                    Value
                  </Label>
                  <div className="flex col-span-3">
                    <Select defaultValue="percent">
                      <SelectTrigger className="w-[100px] rounded-r-none">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percent">Percent</SelectItem>
                        <SelectItem value="fixed">Fixed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input 
                      id="value" 
                      placeholder="20" 
                      className="rounded-l-none" 
                      type="number"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start-date" className="text-right">
                    Start Date
                  </Label>
                  <Input id="start-date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="end-date" className="text-right">
                    End Date
                  </Label>
                  <Input id="end-date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="target" className="text-right">
                    Target
                  </Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select target" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="new-users">New Users</SelectItem>
                      <SelectItem value="returning">Returning Customers</SelectItem>
                      <SelectItem value="referrals">Referrals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="usage-limit" className="text-right">
                    Usage Limit
                  </Label>
                  <Input 
                    id="usage-limit" 
                    placeholder="Unlimited" 
                    type="number" 
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea 
                    id="description" 
                    placeholder="Enter promotion details"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="active" className="text-right">
                    Active
                  </Label>
                  <div className="flex items-center space-x-2 col-span-3">
                    <Switch id="active" defaultChecked />
                    <Label htmlFor="active">Make promotion active immediately</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Promotion</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="discounts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger 
            value="discounts" 
            onClick={() => setActiveTab("discounts")}
            className="flex items-center gap-2"
          >
            <Percent className="h-4 w-4" />
            Discounts & Promotions
          </TabsTrigger>
          <TabsTrigger 
            value="coupons" 
            onClick={() => setActiveTab("coupons")}
            className="flex items-center gap-2"
          >
            <Tag className="h-4 w-4" />
            Coupon Codes
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            onClick={() => setActiveTab("analytics")}
            className="flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Performance Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="discounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Promotions</CardTitle>
              <CardDescription>
                Manage active, scheduled, and expired promotional offers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPromotions.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell className="font-medium">{promo.name}</TableCell>
                      <TableCell>
                        {promo.type === "discount" ? (
                          <Badge variant="default" className="bg-blue-500">Discount</Badge>
                        ) : (
                          <Badge variant="default" className="bg-purple-500">Credit</Badge>
                        )}
                      </TableCell>
                      <TableCell>{promo.value}</TableCell>
                      <TableCell>{promo.startDate}</TableCell>
                      <TableCell>{promo.endDate}</TableCell>
                      <TableCell>
                        {promo.status === "active" ? (
                          <Badge variant="default" className="bg-green-500">Active</Badge>
                        ) : (
                          <Badge variant="outline">Scheduled</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {promo.target === "all" ? (
                          "All Users"
                        ) : promo.target === "new-users" ? (
                          "New Users"
                        ) : promo.target === "referrals" ? (
                          "Referrals"
                        ) : (
                          "Weekends"
                        )}
                      </TableCell>
                      <TableCell>{promo.usageCount} uses</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="coupons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Coupon Codes</CardTitle>
              <CardDescription>
                Manage single-use and multiple-use coupon codes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Valid Until</TableHead>
                    <TableHead>Usage Limit</TableHead>
                    <TableHead>Usage Count</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCoupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell className="font-medium">{coupon.code}</TableCell>
                      <TableCell>{coupon.discount}</TableCell>
                      <TableCell>{coupon.validUntil}</TableCell>
                      <TableCell>{coupon.usageLimit}</TableCell>
                      <TableCell>{coupon.usageCount}</TableCell>
                      <TableCell>
                        {coupon.status === "active" ? (
                          <Badge variant="default" className="bg-green-500">Active</Badge>
                        ) : (
                          <Badge variant="destructive">Expired</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">N$142,384</div>
                <p className="text-xs text-muted-foreground">+24% from last month</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-1 rounded-full" style={{width: "72%"}}></div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Promotion Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,851</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-1 rounded-full" style={{width: "68%"}}></div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">New Customer Acquisition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">789</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-1 rounded-full" style={{width: "62%"}}></div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Promotions</CardTitle>
              <CardDescription>
                Analysis of most effective promotions by revenue and usage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Promotion</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Revenue Impact</TableHead>
                    <TableHead>Conversion Rate</TableHead>
                    <TableHead>Customer Retention</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">New User Bonus</TableCell>
                    <TableCell>Credit</TableCell>
                    <TableCell>891 uses</TableCell>
                    <TableCell>N$48,291</TableCell>
                    <TableCell>68%</TableCell>
                    <TableCell>42%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Summer Special</TableCell>
                    <TableCell>Discount</TableCell>
                    <TableCell>452 uses</TableCell>
                    <TableCell>N$36,172</TableCell>
                    <TableCell>58%</TableCell>
                    <TableCell>62%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Weekend Deal</TableCell>
                    <TableCell>Discount</TableCell>
                    <TableCell>728 uses</TableCell>
                    <TableCell>N$29,854</TableCell>
                    <TableCell>45%</TableCell>
                    <TableCell>74%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Referral Reward</TableCell>
                    <TableCell>Discount</TableCell>
                    <TableCell>317 uses</TableCell>
                    <TableCell>N$18,436</TableCell>
                    <TableCell>72%</TableCell>
                    <TableCell>81%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" /> Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full text-left justify-start" variant="outline">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Seasonal Promotion
              </Button>
              <Button className="w-full text-left justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Create Loyalty Program Offer
              </Button>
              <Button className="w-full text-left justify-start" variant="outline">
                <DollarSign className="mr-2 h-4 w-4" />
                Launch Flash Sale
              </Button>
              <Button className="w-full text-left justify-start" variant="outline">
                <Star className="mr-2 h-4 w-4" />
                Setup VIP Customer Discount
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Promotion Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-md flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">Holiday Special</h4>
                  <p className="text-sm text-muted-foreground">Starts Dec 1, 2023</p>
                </div>
                <Badge variant="outline">Upcoming</Badge>
              </div>
              
              <div className="p-3 border rounded-md flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">Black Friday Sale</h4>
                  <p className="text-sm text-muted-foreground">Starts Nov 24, 2023</p>
                </div>
                <Badge variant="outline">Upcoming</Badge>
              </div>
              
              <div className="p-3 border rounded-md flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">Summer Special</h4>
                  <p className="text-sm text-muted-foreground">Ends Aug 31, 2023</p>
                </div>
                <Badge variant="default" className="bg-green-500">Active</Badge>
              </div>
              
              <div className="p-3 border rounded-md flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">Back to School</h4>
                  <p className="text-sm text-muted-foreground">Starts Jan 15, 2024</p>
                </div>
                <Badge variant="outline">Planned</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Promotions;
