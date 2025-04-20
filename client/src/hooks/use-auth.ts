import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { getRoleFromMetadata } from "@/lib/clerk";
import type { User } from "@shared/schema";

export function useAuth() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [userRole, setUserRole] = useState<string | null>(null);
  
  // Fetch user info from our database
  const { data: dbUser, isLoading: isLoadingDbUser } = useQuery<User>({
    queryKey: ["/api/users/me"],
    enabled: !!isSignedIn,
  });
  
  useEffect(() => {
    // Try to get role from our database first
    if (dbUser?.role) {
      setUserRole(dbUser.role);
    } 
    // Fall back to Clerk metadata
    else if (user?.publicMetadata) {
      setUserRole(getRoleFromMetadata(user.publicMetadata as Record<string, any>));
    } 
    // Default to customer if no role is found
    else if (isSignedIn && isLoaded && !isLoadingDbUser) {
      setUserRole("customer");
    } 
    // Clear role if not signed in
    else if (!isSignedIn && isLoaded) {
      setUserRole(null);
    }
  }, [user, isLoaded, isSignedIn, dbUser, isLoadingDbUser]);
  
  return {
    isLoaded: isLoaded && !isLoadingDbUser,
    isSignedIn,
    userRole,
    user,
    dbUser,
  };
}
