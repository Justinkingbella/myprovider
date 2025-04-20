import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  linkText: string;
  linkHref: string;
  color?: "primary" | "secondary" | "green" | "indigo" | "yellow" | "red";
  valueClass?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  linkText,
  linkHref,
  color = "primary",
  valueClass,
}: StatsCardProps) {
  // Define color map for the icon background
  const colorMap = {
    primary: "bg-primary-500",
    secondary: "bg-secondary-500",
    green: "bg-green-500",
    indigo: "bg-indigo-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  // Define color map for the link text
  const linkColorMap = {
    primary: "text-primary-600 hover:text-primary-500",
    secondary: "text-secondary-600 hover:text-secondary-500",
    green: "text-green-600 hover:text-green-500",
    indigo: "text-indigo-600 hover:text-indigo-500",
    yellow: "text-yellow-600 hover:text-yellow-500",
    red: "text-red-600 hover:text-red-500",
  };

  return (
    <Card className="bg-white overflow-hidden shadow">
      <CardContent className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={cn("flex-shrink-0 rounded-md p-3", colorMap[color])}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd>
                <div className={cn("text-lg font-medium text-gray-900", valueClass)}>
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </CardContent>
      <div className="bg-gray-50 px-4 py-4 sm:px-6">
        <div className="text-sm">
          <a href={linkHref} className={cn("font-medium", linkColorMap[color])}>
            {linkText}
          </a>
        </div>
      </div>
    </Card>
  );
}
