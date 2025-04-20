import { Request, Response, NextFunction } from "express";
import { storage } from "../storage";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { buffer } from "micro";
import { createClerkClient, verifyToken } from "@clerk/backend";

// Extend the Request type to include auth information
declare global {
  namespace Express {
    interface Request {
      auth: {
        userId: string;
        sessionId: string;
        getToken: () => string;
      };
    }
  }
}

// Initialize Clerk client
const clerkSecretKey = process.env.CLERK_SECRET_KEY;
const clerk = createClerkClient({ secretKey: clerkSecretKey });

/**
 * Middleware to validate Clerk authentication
 */
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Skip auth for webhook endpoint
  if (req.path === "/api/webhooks/clerk") {
    return next();
  }

  try {
    const authHeader = req.headers.authorization;
    
    // If no authorization header, user is not authenticated
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // Only require authentication for /api routes
      if (req.path.startsWith("/api")) {
        return res.status(401).json({ message: "Unauthorized - Missing or invalid token" });
      } else {
        // For non-API routes, just continue without auth
        return next();
      }
    }
    
    const token = authHeader.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Missing token" });
    }
    
    // Verify the token with Clerk
    let payload;
    try {
      // Use Clerk to verify the JWT token
      payload = await verifyToken(token, { secretKey: clerkSecretKey });
      
      if (!payload) {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
      }
    } catch (verifyError) {
      console.error("Token verification error:", verifyError);
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    
    // Add auth information to request
    req.auth = {
      userId: payload.sub,
      sessionId: payload.sid || "",
      getToken: () => token,
    };
    
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    
    // Only require authentication for /api routes
    if (req.path.startsWith("/api")) {
      return res.status(401).json({ message: "Unauthorized - Error processing authentication" });
    } else {
      // For non-API routes, just continue without auth
      return next();
    }
  }
}

/**
 * Middleware to require authentication
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.auth || !req.auth.userId) {
    return res.status(401).json({ message: "Unauthorized - Authentication required" });
  }
  next();
}

/**
 * Middleware to require a specific role
 */
export function requireRole(requiredRole: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ message: "Unauthorized - Authentication required" });
      }
      
      const user = await storage.getUserByClerkId(req.auth.userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      if (user.role !== requiredRole) {
        return res.status(403).json({ message: `Forbidden - Requires ${requiredRole} role` });
      }
      
      next();
    } catch (error) {
      console.error("Error checking role:", error);
      return res.status(500).json({ message: "Error checking role permissions" });
    }
  };
}
