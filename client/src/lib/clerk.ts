// This file contains helper functions for working with Clerk in the frontend
// Client-side functions only

/**
 * Gets the role from a user's public metadata
 */
export function getRoleFromMetadata(publicMetadata: Record<string, any> | undefined): string {
  if (!publicMetadata) return "customer";
  return publicMetadata.role || "customer";
}

// Note: All server-side Clerk operations are now handled via API calls
// For admin operations like updating roles, we'll use the server endpoints
