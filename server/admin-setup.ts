import { storage } from './storage';

// Function to create the admin user if not already exists
export async function setupAdminUser() {
  try {
    // Check if admin with this email already exists
    const adminUser = await storage.getUserByEmail('Antoniojoaquimjustino@gmail.com');
    
    if (!adminUser) {
      console.log("Creating admin user...");
      await storage.createUser({
        username: "admin",
        email: "Antoniojoaquimjustino@gmail.com",
        firstName: "Antonio",
        lastName: "Joaquim",
        clerkId: "admin_clerk_id", // This would be the actual Clerk ID in production
        role: "admin",
      });
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error setting up admin user:", error);
  }
}