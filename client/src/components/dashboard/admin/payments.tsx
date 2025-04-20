
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Payments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Processing</CardTitle>
        <CardDescription>
          Monitor and manage all platform payments and transactions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6 text-muted-foreground">
          Payment processing and withdrawal management interface will be implemented here.
        </div>
      </CardContent>
    </Card>
  );
}
