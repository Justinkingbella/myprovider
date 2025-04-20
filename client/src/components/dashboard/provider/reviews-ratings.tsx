
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReviewsRatings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews & Ratings</CardTitle>
        <CardDescription>
          View customer reviews and ratings for your services.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6 text-muted-foreground">
          Reviews and ratings interface will be implemented here.
        </div>
      </CardContent>
    </Card>
  );
}
