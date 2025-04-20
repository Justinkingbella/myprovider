
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function EarningsPayout() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings & Payouts</CardTitle>
        <CardDescription>
          Track your earnings and request payouts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6 text-muted-foreground">
          Earnings and payout interface will be implemented here.
        </div>
      </CardContent>
    </Card>
  );
}
