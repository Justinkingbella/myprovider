
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerReviews() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Reviews</CardTitle>
        <CardDescription>
          View and manage your reviews for service providers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6 text-muted-foreground">
          Customer reviews interface will be implemented here.
        </div>
      </CardContent>
    </Card>
  );
}
