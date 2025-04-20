import { pgTable, text, serial, integer, timestamp, boolean, doublePrecision, json, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  clerkId: text("clerk_id").notNull().unique(),
  phone: text("phone"),
  profileImage: text("profile_image"),
  bio: text("bio"),
  address: text("address"),
  role: text("role", { enum: ["admin", "provider", "customer"] }).notNull().default("customer"),
  isVerified: boolean("is_verified").default(false),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Service Categories
export const serviceCategories = pgTable("service_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  icon: text("icon"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Service Locations (Namibian regions and towns)
export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type", { enum: ["region", "city", "town"] }).notNull(),
  parentId: integer("parent_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Provider Profiles
export const providerProfiles = pgTable("provider_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull().unique(),
  businessName: text("business_name"),
  description: text("description"),
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
  subscriptionPlan: text("subscription_plan", { enum: ["free", "premium", "business"] }).default("free"),
  averageRating: doublePrecision("average_rating"),
  totalReviews: integer("total_reviews").default(0),
  bankDetails: jsonb("bank_details"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Provider Services
export const providerServices = pgTable("provider_services", {
  id: serial("id").primaryKey(),
  providerId: integer("provider_id").references(() => providerProfiles.id).notNull(),
  categoryId: integer("category_id").references(() => serviceCategories.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  priceType: text("price_type", { enum: ["hourly", "fixed"] }).default("hourly"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Provider Service Areas
export const providerServiceAreas = pgTable("provider_service_areas", {
  id: serial("id").primaryKey(),
  providerId: integer("provider_id").references(() => providerProfiles.id).notNull(),
  locationId: integer("location_id").references(() => locations.id).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Bookings (formerly Appointments)
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").references(() => users.id).notNull(),
  providerId: integer("provider_id").references(() => users.id).notNull(),
  serviceId: integer("service_id").references(() => providerServices.id).notNull(),
  status: text("status", { 
    enum: ["pending", "confirmed", "in_progress", "completed", "cancelled", "disputed"] 
  }).notNull().default("pending"),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  duration: integer("duration"), // in minutes
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }),
  location: text("location"),
  locationCoordinates: text("location_coordinates"), // stored as "lat,lng"
  notes: text("notes"),
  isUrgent: boolean("is_urgent").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Payments
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").references(() => bookings.id).notNull(),
  customerId: integer("customer_id").references(() => users.id).notNull(),
  providerId: integer("provider_id").references(() => users.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("NAD"), // Namibian Dollar
  status: text("status", { 
    enum: ["pending", "completed", "failed", "refunded"] 
  }).notNull().default("pending"),
  paymentMethod: text("payment_method", { 
    enum: ["paytoday", "payfast", "ewallet", "dop", "mobile_banking", "card", "cash"] 
  }),
  paymentReference: text("payment_reference"),
  paymentDetails: jsonb("payment_details"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Reviews
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").references(() => bookings.id).notNull().unique(),
  customerId: integer("customer_id").references(() => users.id).notNull(),
  providerId: integer("provider_id").references(() => users.id).notNull(),
  rating: integer("rating").notNull(), // 1-5 stars
  comment: text("comment"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Chat Messages
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").references(() => users.id).notNull(),
  receiverId: integer("receiver_id").references(() => users.id).notNull(),
  bookingId: integer("booking_id").references(() => bookings.id),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Promotions table
export const promotions = pgTable("promotions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  type: text("type", { enum: ["discount", "referral", "cashback"] }).notNull(),
  value: decimal("value", { precision: 5, scale: 2 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  description: text("description"),
  status: text("status", { enum: ["active", "inactive", "expired"] }).notNull().default("active"),
  usageLimit: integer("usage_limit"),
  usageCount: integer("usage_count").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Insert schemas for all tables
export const insertUserSchema = createInsertSchema(users)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const insertServiceCategorySchema = createInsertSchema(serviceCategories)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const insertLocationSchema = createInsertSchema(locations)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const insertProviderProfileSchema = createInsertSchema(providerProfiles)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const insertProviderServiceSchema = createInsertSchema(providerServices)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const insertProviderServiceAreaSchema = createInsertSchema(providerServiceAreas)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const insertBookingSchema = createInsertSchema(bookings)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const insertPaymentSchema = createInsertSchema(payments)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const insertReviewSchema = createInsertSchema(reviews)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const insertMessageSchema = createInsertSchema(messages)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const insertPromotionSchema = createInsertSchema(promotions)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

// Schema with validation for user registration
export const userRegistrationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  role: z.enum(["provider", "customer"]).default("customer"),
});

// Types for the database tables
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type ServiceCategory = typeof serviceCategories.$inferSelect;
export type InsertServiceCategory = z.infer<typeof insertServiceCategorySchema>;

export type Location = typeof locations.$inferSelect;
export type InsertLocation = z.infer<typeof insertLocationSchema>;

export type ProviderProfile = typeof providerProfiles.$inferSelect;
export type InsertProviderProfile = z.infer<typeof insertProviderProfileSchema>;

export type ProviderService = typeof providerServices.$inferSelect;
export type InsertProviderService = z.infer<typeof insertProviderServiceSchema>;

export type ProviderServiceArea = typeof providerServiceAreas.$inferSelect;
export type InsertProviderServiceArea = z.infer<typeof insertProviderServiceAreaSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type Promotion = typeof promotions.$inferSelect;
export type InsertPromotion = z.infer<typeof insertPromotionSchema>;

// User registration type
export type UserRegistration = z.infer<typeof userRegistrationSchema>;

// Define relations between tables
export const usersRelations = relations(users, ({ many, one }) => ({
  customerBookings: many(bookings, { relationName: "customerBookings" }),
  providerBookings: many(bookings, { relationName: "providerBookings" }),
  providerProfile: one(providerProfiles, { 
    fields: [users.id], 
    references: [providerProfiles.userId],
    relationName: "userProfile" 
  }),
  sentMessages: many(messages, { relationName: "sentMessages" }),
  receivedMessages: many(messages, { relationName: "receivedMessages" }),
  reviews: many(reviews, { relationName: "userReviews" }),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  customer: one(users, {
    fields: [bookings.customerId],
    references: [users.id],
    relationName: "customerBookings",
  }),
  provider: one(users, {
    fields: [bookings.providerId],
    references: [users.id],
    relationName: "providerBookings",
  }),
  service: one(providerServices, {
    fields: [bookings.serviceId],
    references: [providerServices.id],
  }),
  payments: many(payments),
  review: one(reviews, { 
    fields: [bookings.id],
    references: [reviews.bookingId],
    relationName: "bookingReview" 
  }),
  messages: many(messages),
}));

export const providerProfilesRelations = relations(providerProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [providerProfiles.userId],
    references: [users.id],
    relationName: "userProfile",
  }),
  services: many(providerServices),
  serviceAreas: many(providerServiceAreas),
}));

export const providerServicesRelations = relations(providerServices, ({ one, many }) => ({
  provider: one(providerProfiles, {
    fields: [providerServices.providerId],
    references: [providerProfiles.id],
    relationName: "providerServices",
  }),
  category: one(serviceCategories, {
    fields: [providerServices.categoryId],
    references: [serviceCategories.id],
  }),
  bookings: many(bookings),
}));

export const serviceCategoriesRelations = relations(serviceCategories, ({ many }) => ({
  services: many(providerServices),
}));

export const locationsRelations = relations(locations, ({ one, many }) => ({
  parent: one(locations, {
    fields: [locations.parentId],
    references: [locations.id],
    relationName: "subLocations",
  }),
  subLocations: many(locations),
  providerAreas: many(providerServiceAreas),
}));

export const providerServiceAreasRelations = relations(providerServiceAreas, ({ one }) => ({
  provider: one(providerProfiles, {
    fields: [providerServiceAreas.providerId],
    references: [providerProfiles.id],
    relationName: "providerAreas",
  }),
  location: one(locations, {
    fields: [providerServiceAreas.locationId],
    references: [locations.id],
    relationName: "locationProviders",
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  booking: one(bookings, {
    fields: [payments.bookingId],
    references: [bookings.id],
    relationName: "bookingPayments",
  }),
  customer: one(users, {
    fields: [payments.customerId],
    references: [users.id],
  }),
  provider: one(users, {
    fields: [payments.providerId],
    references: [users.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  booking: one(bookings, {
    fields: [reviews.bookingId],
    references: [bookings.id],
    relationName: "bookingReview",
  }),
  customer: one(users, {
    fields: [reviews.customerId],
    references: [users.id],
  }),
  provider: one(users, {
    fields: [reviews.providerId],
    references: [users.id],
    relationName: "userReviews",
  }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
    relationName: "sentMessages",
  }),
  receiver: one(users, {
    fields: [messages.receiverId],
    references: [users.id],
    relationName: "receivedMessages",
  }),
  booking: one(bookings, {
    fields: [messages.bookingId],
    references: [bookings.id],
    relationName: "bookingMessages",
  }),
}));