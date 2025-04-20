
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Percent, Gift, Tag, Clock, Users, DollarSign } from "lucide-react";

export default function Promotions() {
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      name: "New User Discount",
      type: "discount",
      value: 20,
      code: "WELCOME20",
      status: "active",
      startDate: "2023-07-01",
      endDate: "2023-12-31",
      usageLimit: 1000,
      usageCount: 245,
    },
    {
      id: 2,
      name: "Weekend Special",
      type: "discount",
      value: 15,
      code: "WEEKEND15",
      status: "active",
      startDate: "2023-08-01",
      endDate: "2023-08-31",
      usageLimit: 500,
      usageCount: 123,
    },
    {
      id: 3,
      name: "Refer a Friend",
      type: "referral",
      value: 10,
      code: "REF10",
      status: "active",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      usageLimit: null,
      usageCount: 389,
    },
  ]);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="active">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="active">Active Promotions</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="new">Create New</TabsTrigger>
          </TabsList>
          <Button>
            <Gift className="mr-2 h-4 w-4" />
            New Promotion
          </Button>
        </div>

        <TabsContent value="active" className="space-y-4">
          {promotions.map((promo) => (
            <Card key={promo.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{promo.name}</h3>
                      <Badge variant={promo.status === "active" ? "success" : "secondary"}>
                        {promo.status}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground mt-1">Code: {promo.code}</div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center text-sm">
                        <Percent className="mr-1 h-4 w-4 text-muted-foreground" />
                        {promo.value}% {promo.type}
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                        {promo.startDate} to {promo.endDate}
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                        {promo.usageCount} / {promo.usageLimit || "∞"} uses
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-destructive">Pause</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Promotion</CardTitle>
              <CardDescription>
                Set up a new discount code, referral bonus, or special offer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="promo-name">Promotion Name</Label>
                    <Input id="promo-name" placeholder="e.g. Summer Sale" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="promo-code">Promotion Code</Label>
                    <Input id="promo-code" placeholder="e.g. SUMMER20" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="promo-type">Type</Label>
                    <Select defaultValue="discount">
                      <SelectTrigger id="promo-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="discount">Discount</SelectItem>
                        <SelectItem value="referral">Referral Bonus</SelectItem>
                        <SelectItem value="cashback">Cashback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="promo-value">Value (%)</Label>
                    <Input id="promo-value" type="number" placeholder="10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="promo-limit">Usage Limit</Label>
                    <Input id="promo-limit" type="number" placeholder="1000" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Details about this promotion..."
                    className="h-24"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="active" />
                  <Label htmlFor="active">Make active immediately</Label>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Create Promotion</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
