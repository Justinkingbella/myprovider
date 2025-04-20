
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
import { Progress } from "@/components/ui/progress";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Gift, 
  Award, 
  Share2, 
  Copy, 
  Check, 
  CheckCircle, 
  Star, 
  Clock, 
  Coins, 
  Tag, 
  ChevronRight,
  Users
} from "lucide-react";

export default function LoyaltyProgram() {
  const [activeTab, setActiveTab] = useState("loyalty");
  const [copySuccess, setCopySuccess] = useState(false);
  const [referralLink] = useState("https://yourplatform.com/ref/USER123");
  
  // Mock loyalty data
  const loyaltyData = {
    tierName: "Silver Member",
    points: 750,
    nextTier: 1000,
    tierProgress: 75,
    referralCredits: 150,
    completedBookings: 12,
    totalSpent: 3850,
    availableRewards: [
      { id: 1, name: "10% Off Next Booking", points: 500, icon: "tag" },
      { id: 2, name: "Free Booking (up to N$300)", points: 2000, icon: "gift" },
      { id: 3, name: "Priority Service", points: 1500, icon: "star" }
    ],
    redemptionHistory: [
      { id: 101, reward: "5% Off Booking", points: 250, date: "2023-05-15" }
    ],
    tiers: [
      { name: "Bronze", min: 0, max: 499, perks: ["Basic service access"] },
      { name: "Silver", min: 500, max: 999, perks: ["5% discount on all services", "24hr priority support"] },
      { name: "Gold", min: 1000, max: 2499, perks: ["10% discount on all services", "Free cancellation", "Exclusive offers"] },
      { name: "Platinum", min: 2500, max: Infinity, perks: ["15% discount on all services", "Free premium services", "Personal concierge"] }
    ]
  };
  
  // Mock referral data
  const referralData = {
    referralCode: "USER123",
    creditPerReferral: 100,
    pendingReferrals: 2,
    successfulReferrals: 3,
    referralHistory: [
      { id: 1, name: "Jane Smith", status: "completed", credit: 100, date: "2023-06-10" },
      { id: 2, name: "John Doe", status: "completed", credit: 100, date: "2023-05-22" },
      { id: 3, name: "Sarah Johnson", status: "completed", credit: 100, date: "2023-05-15" },
      { id: 4, name: "Mike Wilson", status: "pending", credit: 100, date: "2023-06-18" },
      { id: 5, name: "Emily Brown", status: "pending", credit: 100, date: "2023-06-20" }
    ]
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };
  
  const getCurrentTier = () => {
    return loyaltyData.tiers.find(tier => 
      loyaltyData.points >= tier.min && loyaltyData.points <= tier.max
    );
  };
  
  const getNextTier = () => {
    const currentTierIndex = loyaltyData.tiers.findIndex(tier => 
      loyaltyData.points >= tier.min && loyaltyData.points <= tier.max
    );
    return currentTierIndex < loyaltyData.tiers.length - 1 
      ? loyaltyData.tiers[currentTierIndex + 1] 
      : null;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="loyalty" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="loyalty">Loyalty Rewards</TabsTrigger>
          <TabsTrigger value="referrals">Referral Program</TabsTrigger>
        </TabsList>
        
        <TabsContent value="loyalty" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Your Loyalty Status</span>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                  {loyaltyData.tierName}
                </Badge>
              </CardTitle>
              <CardDescription>
                Earn points with every booking to unlock exclusive rewards and benefits.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{loyaltyData.points} points</span>
                    <span>{getNextTier() ? `${getNextTier()?.name} at ${getNextTier()?.min} points` : 'Maximum tier reached'}</span>
                  </div>
                  <Progress value={loyaltyData.tierProgress} className="h-2" />
                  {getNextTier() && (
                    <p className="text-xs text-muted-foreground">
                      {getNextTier()?.min - loyaltyData.points} more points to reach {getNextTier()?.name}
                    </p>
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-muted rounded-lg">
                    <Coins className="h-5 w-5 mx-auto mb-1 text-amber-500" />
                    <div className="text-xl font-bold">{loyaltyData.points}</div>
                    <div className="text-xs text-muted-foreground">Total Points</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <Clock className="h-5 w-5 mx-auto mb-1 text-indigo-500" />
                    <div className="text-xl font-bold">{loyaltyData.completedBookings}</div>
                    <div className="text-xs text-muted-foreground">Bookings</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <Gift className="h-5 w-5 mx-auto mb-1 text-emerald-500" />
                    <div className="text-xl font-bold">N${loyaltyData.referralCredits}</div>
                    <div className="text-xs text-muted-foreground">Credits</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Available Rewards</CardTitle>
              <CardDescription>
                Redeem your points for exclusive rewards and discounts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loyaltyData.availableRewards.map((reward) => (
                  <div key={reward.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      {reward.icon === 'tag' && <Tag className="h-5 w-5 mr-3 text-blue-500" />}
                      {reward.icon === 'gift' && <Gift className="h-5 w-5 mr-3 text-emerald-500" />}
                      {reward.icon === 'star' && <Star className="h-5 w-5 mr-3 text-amber-500" />}
                      <div>
                        <p className="font-medium">{reward.name}</p>
                        <p className="text-xs text-muted-foreground">{reward.points} points</p>
                      </div>
                    </div>
                    <Button 
                      variant={loyaltyData.points >= reward.points ? "default" : "outline"} 
                      size="sm"
                      disabled={loyaltyData.points < reward.points}
                    >
                      {loyaltyData.points >= reward.points ? "Redeem" : `${reward.points - loyaltyData.points} more points`}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Membership Tiers & Benefits</CardTitle>
              <CardDescription>
                Discover the benefits of each loyalty tier.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loyaltyData.tiers.map((tier, index) => (
                  <div 
                    key={index} 
                    className={`p-4 border rounded-lg ${
                      tier.name === loyaltyData.tierName 
                        ? 'border-yellow-200 bg-yellow-50' 
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Award className={`h-5 w-5 mr-2 ${
                          tier.name === 'Bronze' ? 'text-amber-700' :
                          tier.name === 'Silver' ? 'text-gray-400' :
                          tier.name === 'Gold' ? 'text-yellow-500' :
                          'text-slate-700'
                        }`} />
                        <h3 className="font-medium">{tier.name}</h3>
                      </div>
                      <div className="text-sm">
                        {tier.min.toLocaleString()} - {tier.max === Infinity ? '∞' : tier.max.toLocaleString()} points
                      </div>
                    </div>
                    <div className="mt-2 pl-7">
                      <p className="text-sm font-medium">Benefits:</p>
                      <ul className="text-sm mt-1 space-y-1">
                        {tier.perks.map((perk, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-3 w-3 mt-1 mr-2 text-green-500" />
                            {perk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="referrals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Refer & Earn</CardTitle>
              <CardDescription>
                Invite friends to join the platform and earn credits for successful referrals.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border rounded-lg bg-muted/50">
                <h3 className="font-medium mb-2">Your Referral Link</h3>
                <div className="flex items-center gap-2">
                  <Input 
                    value={referralLink} 
                    readOnly 
                    className="font-mono text-sm"
                  />
                  <Button 
                    size="icon" 
                    variant="outline" 
                    onClick={copyToClipboard}
                    className="flex-shrink-0"
                  >
                    {copySuccess ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Share this link with friends and earn N${referralData.creditPerReferral} when they complete their first booking.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share via Email
                </Button>
                <Button className="flex-1">
                  <Users className="mr-2 h-4 w-4" />
                  Share to WhatsApp
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-xl font-bold">{referralData.successfulReferrals}</div>
                  <div className="text-xs text-muted-foreground">Successful Referrals</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-xl font-bold">N${referralData.successfulReferrals * referralData.creditPerReferral}</div>
                  <div className="text-xs text-muted-foreground">Total Earned</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Referral History</CardTitle>
              <CardDescription>
                Track the status of your referrals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referralData.referralHistory.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{referral.name}</p>
                      <p className="text-xs text-muted-foreground">Referred on {referral.date}</p>
                    </div>
                    <div className="flex items-center">
                      {referral.status === 'completed' ? (
                        <Badge className="mr-2 bg-green-50 text-green-700 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="mr-2 bg-yellow-50 text-yellow-700 border-yellow-200">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                      <span className="text-sm font-medium">
                        {referral.status === 'completed' ? `+N$${referral.credit}` : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>
                Learn how to earn rewards through our referral program.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Share Your Referral Link</h3>
                    <p className="text-sm text-muted-foreground">
                      Share your unique referral link with friends and family who might be interested in our services.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">They Sign Up & Book</h3>
                    <p className="text-sm text-muted-foreground">
                      When they use your link to sign up and complete their first booking, the referral is tracked.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Both Get Rewarded</h3>
                    <p className="text-sm text-muted-foreground">
                      You earn N${referralData.creditPerReferral} in credit for each successful referral, and your friend gets a N$50 discount on their first booking.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Gift className="mr-2 h-4 w-4" />
                Start Referring Now
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
