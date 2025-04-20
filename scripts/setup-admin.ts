
import { db } from '../server/db';
import { setupAdminUser } from '../server/admin-setup';
import { migrate } from '../server/migrations';

async function main() {
  try {
    console.log("Running database migrations...");
    await migrate(db);
    console.log("Migrations completed successfully");
    
    console.log("Setting up admin user...");
    await setupAdminUser();
    console.log("Admin setup completed");
    
    console.log("Setup completed successfully!");
  } catch (error) {
    console.error("Error during setup:", error);
  } finally {
    process.exit(0);
  }
}

main();
