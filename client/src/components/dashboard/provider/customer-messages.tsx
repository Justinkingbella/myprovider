
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerMessages() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Messages</CardTitle>
        <CardDescription>
          Chat with your customers about bookings and services.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6 text-muted-foreground">
          Customer chat interface will be implemented here.
        </div>
      </CardContent>
    </Card>
  );
}
