import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertAppointmentSchema, userRegistrationSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { authMiddleware, requireAuth, requireRole } from "./middleware/auth";

// Helper function to handle Zod validation errors
const handleZodError = (error: unknown, res: Response) => {
  if (error instanceof ZodError) {
    const validationError = fromZodError(error);
    return res.status(400).json({ message: validationError.message });
  }
  return res.status(500).json({ message: "Internal server error" });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Apply Clerk auth middleware
  app.use(authMiddleware);

  // User Routes
  app.get("/api/users/me", requireAuth, async (req: Request, res: Response) => {
    try {
      const user = await storage.getUserByClerkId(req.auth.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ message: "Error fetching user" });
    }
  });

  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      // Validate request body against schema
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user with same email already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(409).json({ message: "User with this email already exists" });
      }
      
      const user = await storage.createUser(userData);
      return res.status(201).json(user);
    } catch (error) {
      return handleZodError(error, res);
    }
  });

  // Admin-only route to list all users
  app.get("/api/users", requireAuth, requireRole("admin"), async (_req: Request, res: Response) => {
    try {
      const users = await storage.listUsers();
      return res.json(users);
    } catch (error) {
      console.error("Error listing users:", error);
      return res.status(500).json({ message: "Error listing users" });
    }
  });

  // Get users by role
  app.get("/api/users/role/:role", requireAuth, requireRole("admin"), async (req: Request, res: Response) => {
    try {
      const { role } = req.params;
      if (!["admin", "provider", "customer"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
      
      const users = await storage.listUsersByRole(role);
      return res.json(users);
    } catch (error) {
      console.error("Error listing users by role:", error);
      return res.status(500).json({ message: "Error listing users by role" });
    }
  });

  // Update user
  app.patch("/api/users/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      // Get user from database
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Check if the user is updating their own profile or is an admin
      const currentUser = await storage.getUserByClerkId(req.auth.userId);
      if (!currentUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      if (currentUser.id !== id && currentUser.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      // Update user
      const updatedUser = await storage.updateUser(id, req.body);
      return res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ message: "Error updating user" });
    }
  });

  // Delete user (admin only)
  app.delete("/api/users/:id", requireAuth, requireRole("admin"), async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      // Delete user
      const success = await storage.deleteUser(id);
      if (!success) {
        return res.status(404).json({ message: "User not found" });
      }
      
      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ message: "Error deleting user" });
    }
  });

  // Appointment Routes
  app.post("/api/appointments", requireAuth, async (req: Request, res: Response) => {
    try {
      // Validate request body against schema
      const appointmentData = insertAppointmentSchema.parse(req.body);
      
      // Check if user has permission to create this appointment
      const currentUser = await storage.getUserByClerkId(req.auth.userId);
      if (!currentUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      // If customer, can only create appointments for self
      if (currentUser.role === "customer" && appointmentData.customerId !== currentUser.id) {
        return res.status(403).json({ message: "You can only create appointments for yourself" });
      }
      
      // If provider, can only create appointments where provider is self
      if (currentUser.role === "provider" && appointmentData.providerId !== currentUser.id) {
        return res.status(403).json({ message: "You can only create appointments where you are the provider" });
      }
      
      const appointment = await storage.createAppointment(appointmentData);
      return res.status(201).json(appointment);
    } catch (error) {
      return handleZodError(error, res);
    }
  });

  // Get appointments for current user
  app.get("/api/appointments/me", requireAuth, async (req: Request, res: Response) => {
    try {
      const currentUser = await storage.getUserByClerkId(req.auth.userId);
      if (!currentUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      let appointments: any[] = [];
      
      if (currentUser.role === "customer") {
        appointments = await storage.listAppointmentsByCustomer(currentUser.id);
      } else if (currentUser.role === "provider") {
        appointments = await storage.listAppointmentsByProvider(currentUser.id);
      } else if (currentUser.role === "admin") {
        appointments = await storage.listAppointments();
      }
      
      return res.json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return res.status(500).json({ message: "Error fetching appointments" });
    }
  });

  // Get all appointments (admin only)
  app.get("/api/appointments", requireAuth, requireRole("admin"), async (_req: Request, res: Response) => {
    try {
      const appointments = await storage.listAppointments();
      return res.json(appointments);
    } catch (error) {
      console.error("Error listing appointments:", error);
      return res.status(500).json({ message: "Error listing appointments" });
    }
  });

  // Update appointment
  app.patch("/api/appointments/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid appointment ID" });
      }
      
      // Get appointment from database
      const appointment = await storage.getAppointment(id);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      
      // Check if user has permission to update this appointment
      const currentUser = await storage.getUserByClerkId(req.auth.userId);
      if (!currentUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      // Only admin, the customer, or the provider can update the appointment
      if (
        currentUser.role !== "admin" && 
        currentUser.id !== appointment.customerId && 
        currentUser.id !== appointment.providerId
      ) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      // Update appointment
      const updatedAppointment = await storage.updateAppointment(id, req.body);
      return res.json(updatedAppointment);
    } catch (error) {
      console.error("Error updating appointment:", error);
      return res.status(500).json({ message: "Error updating appointment" });
    }
  });

  // Delete appointment
  app.delete("/api/appointments/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid appointment ID" });
      }
      
      // Get appointment from database
      const appointment = await storage.getAppointment(id);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      
      // Check if user has permission to delete this appointment
      const currentUser = await storage.getUserByClerkId(req.auth.userId);
      if (!currentUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      // Only admin, the customer, or the provider can delete the appointment
      if (
        currentUser.role !== "admin" && 
        currentUser.id !== appointment.customerId && 
        currentUser.id !== appointment.providerId
      ) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      // Delete appointment
      const success = await storage.deleteAppointment(id);
      if (!success) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      
      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting appointment:", error);
      return res.status(500).json({ message: "Error deleting appointment" });
    }
  });

  // Webhook endpoint for Clerk events
  app.post("/api/webhooks/clerk", async (req: Request, res: Response) => {
    try {
      // Get the webhook signature from the request headers
      const svix_id = req.headers["svix-id"] as string;
      const svix_timestamp = req.headers["svix-timestamp"] as string;
      const svix_signature = req.headers["svix-signature"] as string;
      
      // If there's no signature, return 400
      if (!svix_id || !svix_timestamp || !svix_signature) {
        console.error("Missing Svix headers");
        return res.status(400).json({ message: "Missing Svix headers" });
      }
      
      // Get the body as text
      const payload = JSON.stringify(req.body);
      
      // Create a new Webhook instance with your webhook secret
      const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || "";
      const wh = new Webhook(webhookSecret);
      
      let evt;
      try {
        // Verify the webhook
        evt = wh.verify(payload, {
          "svix-id": svix_id,
          "svix-timestamp": svix_timestamp,
          "svix-signature": svix_signature,
        } as WebhookRequiredHeaders);
      } catch (err) {
        console.error("Error verifying webhook:", err);
        return res.status(400).json({ message: "Invalid webhook signature" });
      }
      
      // Get event type and data
      const { type, data } = evt.data;
      
      // Handle user creation
      if (type === "user.created") {
        const { id, email_addresses, first_name, last_name } = data;
        
        // Check if user already exists
        const existingUser = await storage.getUserByClerkId(id);
        if (existingUser) {
          return res.status(200).json({ message: "User already exists" });
        }
        
        // Create user in our database
        const primaryEmail = email_addresses.find((email: any) => email.id === data.primary_email_address_id);
        if (!primaryEmail) {
          return res.status(400).json({ message: "User has no primary email" });
        }
        
        // Determine role based on email
        const email = primaryEmail.email_address.toLowerCase();
        
        // Set role based on email
        let userRole: "admin" | "provider" | "customer" = "customer"; // Default role
        
        // Set admin role for the specified email
        if (email === "antoniojoaquimjustino@gmail.com") {
          userRole = "admin";
        }
        
        await storage.createUser({
          username: email.split("@")[0],
          email: email,
          firstName: first_name || "",
          lastName: last_name || "",
          clerkId: id,
          role: userRole,
        });
      }
      
      // Handle user deletion
      if (type === "user.deleted") {
        const { id } = data;
        const user = await storage.getUserByClerkId(id);
        if (user) {
          await storage.deleteUser(user.id);
        }
      }
      
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error processing webhook:", error);
      return res.status(500).json({ message: "Error processing webhook" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
