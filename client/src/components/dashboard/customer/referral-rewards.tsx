
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReferralRewards() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Referrals & Rewards</CardTitle>
        <CardDescription>
          Earn rewards by referring friends and view your loyalty points.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6 text-muted-foreground">
          Referrals and rewards interface will be implemented here.
        </div>
      </CardContent>
    </Card>
  );
}
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, Copy, Share2, Users, Award, DollarSign } from "lucide-react";
import { useState } from "react";

export default function ReferralRewards() {
  const [copied, setCopied] = useState(false);
  
  // Mock data - in a real app, this would come from API
  const referralCode = "FRIEND25";
  const referralLink = `https://yourapp.com/signup?ref=${referralCode}`;
  const rewardAmount = 50;
  const referralHistory = [
    { id: 1, name: "John Doe", date: "2023-08-15", status: "completed", reward: 50 },
    { id: 2, name: "Jane Smith", date: "2023-07-22", status: "completed", reward: 50 },
    { id: 3, name: "Mark Williams", date: "2023-06-10", status: "pending", reward: 50 }
  ];
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="h-5 w-5 mr-2 text-primary" />
            Refer a Friend
          </CardTitle>
          <CardDescription>
            Invite friends and earn N${rewardAmount} credit when they complete their first booking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-primary/5 rounded-lg p-5 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-grow">
                <p className="text-sm mb-2 font-medium">Your personal referral code:</p>
                <div className="flex">
                  <Input value={referralCode} readOnly className="font-mono text-center bg-background" />
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="ml-2"
                    onClick={() => copyToClipboard(referralCode)}
                  >
                    {copied ? <span className="text-xs">Copied!</span> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="h-0 md:h-16 w-px bg-border hidden md:block" />
              <div className="flex-grow">
                <p className="text-sm mb-2 font-medium">Or share your referral link:</p>
                <div className="flex">
                  <Input value={referralLink} readOnly className="text-xs bg-background" />
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="ml-2"
                    onClick={() => copyToClipboard(referralLink)}
                  >
                    {copied ? <span className="text-xs">Copied!</span> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center pt-4">
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share via WhatsApp</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share via Email</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share via Facebook</span>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Users className="h-8 w-8 text-primary mb-2 mt-2" />
                <h3 className="font-medium">Invite Friends</h3>
                <p className="text-sm text-muted-foreground">Share your personal code with friends</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Award className="h-8 w-8 text-primary mb-2 mt-2" />
                <h3 className="font-medium">They Sign Up</h3>
                <p className="text-sm text-muted-foreground">Friends create an account using your code</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center text-center">
                <DollarSign className="h-8 w-8 text-primary mb-2 mt-2" />
                <h3 className="font-medium">Earn Rewards</h3>
                <p className="text-sm text-muted-foreground">Get N${rewardAmount} when they complete a booking</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Referral History</CardTitle>
          <CardDescription>
            Track your referrals and rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Reward</th>
                </tr>
              </thead>
              <tbody className="bg-background divide-y divide-border">
                {referralHistory.map((referral) => (
                  <tr key={referral.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{referral.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{referral.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        referral.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {referral.status === 'completed' ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">N${referral.reward}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {referralHistory.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>You haven't referred anyone yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
