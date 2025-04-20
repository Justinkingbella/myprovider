import { apiRequest } from "./queryClient";
import type { User } from "@shared/schema";

/**
 * Checks if the current user has the specified role
 */
export async function checkUserRole(userId: string, requiredRole: string): Promise<boolean> {
  try {
    const response = await apiRequest("GET", "/api/users/me", undefined);
    const user: User = await response.json();
    
    return user.role === requiredRole;
  } catch (error) {
    console.error("Error checking user role:", error);
    return false;
  }
}

/**
 * Gets the current user from our database
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await apiRequest("GET", "/api/users/me", undefined);
    return await response.json();
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Updates the user's role
 * Note: This requires admin privileges
 */
export async function updateUserRole(userId: number, role: string): Promise<boolean> {
  try {
    await apiRequest("PATCH", `/api/users/${userId}`, { role });
    return true;
  } catch (error) {
    console.error("Error updating user role:", error);
    return false;
  }
}
