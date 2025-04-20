
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DisputeResolution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dispute Resolution</CardTitle>
        <CardDescription>
          Handle customer disputes and resolve issues.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6 text-muted-foreground">
          Dispute resolution interface will be implemented here.
        </div>
      </CardContent>
    </Card>
  );
}
