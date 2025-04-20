
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FavoriteProviders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Favorite Providers</CardTitle>
        <CardDescription>
          View and manage your saved service providers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6 text-muted-foreground">
          Favorite providers interface will be implemented here.
        </div>
      </CardContent>
    </Card>
  );
}
