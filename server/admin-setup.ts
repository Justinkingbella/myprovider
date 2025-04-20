
import { storage } from './storage';
import { createClerkClient } from '@clerk/backend';

// Get Clerk secret key from environment
const clerkSecretKey = process.env.CLERK_SECRET_KEY;

// Function to create the admin user if not already exists
export async function setupAdminUser() {
  try {
    // Check if admin with this email already exists
    const adminEmail = 'antoniojoaquimjustino@gmail.com';
    const adminUser = await storage.getUserByEmail(adminEmail);
    
    if (!adminUser) {
      console.log("Creating admin user in database...");
      
      // Create admin in our database
      await storage.createUser({
        username: "admin",
        email: adminEmail,
        firstName: "Antonio",
        lastName: "Joaquim",
        clerkId: "admin_clerk_id", // Will be updated with actual Clerk ID when available
        role: "admin",
      });
      console.log("Admin user created successfully in database");
      
      // If we have Clerk secret key, create admin in Clerk too
      if (clerkSecretKey) {
        try {
          const clerk = createClerkClient({ secretKey: clerkSecretKey });
          
          // Check if user already exists in Clerk
          const existingUsers = await clerk.users.getUserList({
            emailAddress: [adminEmail],
          });
          
          if (existingUsers.data.length === 0) {
            console.log("Creating admin user in Clerk...");
            // Create user in Clerk
            const clerkUser = await clerk.users.createUser({
              emailAddress: [adminEmail],
              password: "Mariabella7753M@AJ",
              firstName: "Antonio",
              lastName: "Joaquim",
              publicMetadata: {
                role: "admin"
              }
            });
            
            console.log(`Admin user created in Clerk with ID: ${clerkUser.id}`);
            
            // Update the database record with the Clerk ID
            if (clerkUser.id) {
              const dbUser = await storage.getUserByEmail(adminEmail);
              if (dbUser) {
                await storage.updateUser(dbUser.id, { clerkId: clerkUser.id });
                console.log("Updated database user with Clerk ID");
              }
            }
          } else {
            console.log("Admin user already exists in Clerk");
            
            // Ensure admin role is set in Clerk
            const clerkUser = existingUsers.data[0];
            if (clerkUser.publicMetadata?.role !== 'admin') {
              await clerk.users.updateUser(clerkUser.id, {
                publicMetadata: { role: 'admin' }
              });
              console.log("Updated admin role in Clerk");
            }
          }
        } catch (clerkError) {
          console.error("Error creating admin in Clerk:", clerkError);
        }
      }
    } else {
      console.log("Admin user already exists in database");
    }
  } catch (error) {
    console.error("Error setting up admin user:", error);
  }
}
