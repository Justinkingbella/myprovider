
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerBookings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Bookings</CardTitle>
        <CardDescription>
          View and manage your upcoming and past bookings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6 text-muted-foreground">
          Customer bookings interface will be implemented here.
        </div>
      </CardContent>
    </Card>
  );
}
