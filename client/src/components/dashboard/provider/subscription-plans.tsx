
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
import { Badge } from "@/components/ui/badge";
import { Check, AlertCircle, ChevronRight, CreditCard, ArrowRight, Star } from "lucide-react";

export default function SubscriptionPlans() {
  const [currentPlan, setCurrentPlan] = useState("free");

  // Mock plan data
  const plans = [
    {
      id: "free",
      name: "Free Plan",
      price: 0,
      billing: "forever",
      description: "Basic features for individuals starting out",
      features: [
        "Up to 5 active bookings per month",
        "Standard commission rate (10%)",
        "Basic profile listing",
        "Standard search ranking"
      ],
      limitations: [
        "Limited visibility in search results",
        "No priority support",
        "No featured placement"
      ]
    },
    {
      id: "pro",
      name: "Pro Plan",
      price: 149,
      billing: "monthly",
      description: "Advanced features for growing businesses",
      features: [
        "Up to 50 active bookings per month",
        "Reduced commission rate (7%)",
        "Enhanced profile with portfolio",
        "Higher search ranking",
        "Priority support",
        "Booking analytics"
      ],
      limitations: [
        "No featured placement",
        "Standard booking notifications"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      price: 499,
      billing: "monthly",
      description: "Premium features for established businesses",
      features: [
        "Unlimited active bookings",
        "Lowest commission rate (5%)",
        "Premium profile with verification badge",
        "Top search ranking",
        "Featured placement on homepage",
        "Priority 24/7 support",
        "Advanced analytics and reports",
        "Custom branding options",
        "Multiple staff accounts"
      ],
      limitations: []
    }
  ];

  const handleUpgrade = (planId: string) => {
    alert(`Upgrading to ${planId} plan`);
    // In a real implementation, this would navigate to a payment page
    // or show a modal with payment options
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Plans</CardTitle>
        <CardDescription>
          Manage your subscription plan and billing to unlock premium features.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h3 className="text-lg font-semibold">Current Plan</h3>
                  <div className="flex items-center mt-1">
                    <Badge className="mr-2 bg-blue-100 text-blue-800">
                      {plans.find(p => p.id === currentPlan)?.name}
                    </Badge>
                    {currentPlan !== "free" && (
                      <span className="text-sm text-muted-foreground">
                        Next billing date: July 15, 2023
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 max-w-md">
                    {plans.find(p => p.id === currentPlan)?.description}
                  </p>
                </div>
                {currentPlan !== "enterprise" && (
                  <Button className="mt-4 md:mt-0" onClick={() => handleUpgrade(currentPlan === "free" ? "pro" : "enterprise")}>
                    Upgrade Plan
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className={`border-2 ${currentPlan === plan.id ? 'border-primary' : 'border-border'}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </div>
                    {plan.id === "enterprise" && (
                      <Badge className="bg-primary">Popular</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">N${plan.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      {plan.billing !== "forever" ? `/${plan.billing}` : ""}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Features</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Limitations</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start">
                              <AlertCircle className="h-4 w-4 mr-2 text-yellow-500 mt-0.5" />
                              <span className="text-sm">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  {currentPlan === plan.id ? (
                    <Button className="w-full" variant="outline" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button 
                      className="w-full"
                      variant={currentPlan !== plan.id ? "default" : "outline"}
                      onClick={() => handleUpgrade(plan.id)}
                    >
                      {plan.id === "free" ? "Downgrade" : "Upgrade"}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md">
            <div className="flex">
              <div className="mr-4">
                <CreditCard className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">Payment Methods</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Upgrade your plan to access premium features and increase your earning potential.
                  We accept PayToday, PayFast, mobile wallets (EWallet, DOP, EasyWallet), and bank transfers.
                </p>
                <Button variant="link" className="p-0 h-auto mt-2 text-blue-600">
                  Manage payment methods
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
