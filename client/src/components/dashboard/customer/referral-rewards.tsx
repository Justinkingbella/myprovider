
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
