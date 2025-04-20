
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User as UserType } from "@shared/schema";

interface CustomerProfileProps {
  user: UserType | null;
}

export default function CustomerProfile({ user }: CustomerProfileProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>
          View and update your account information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6 text-muted-foreground">
          Customer profile interface will be implemented here.
        </div>
      </CardContent>
    </Card>
  );
}
