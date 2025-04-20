import { 
  users, bookings, providerProfiles, providerServices, serviceCategories, 
  locations, providerServiceAreas, payments, reviews, messages,
  type User, type InsertUser, 
  type Booking, type InsertBooking,
  type ProviderProfile, type InsertProviderProfile,
  type ProviderService, type InsertProviderService,
  type ServiceCategory, type InsertServiceCategory,
  type Location, type InsertLocation,
  type ProviderServiceArea, type InsertProviderServiceArea,
  type Payment, type InsertPayment,
  type Review, type InsertReview,
  type Message, type InsertMessage
} from "@shared/schema";
import { and, asc, desc, eq, sql } from 'drizzle-orm';
import { db } from './db';

// Comprehensive storage interface for all entity types
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByClerkId(clerkId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;
  listUsers(): Promise<User[]>;
  listUsersByRole(role: string): Promise<User[]>;
  
  // Booking methods (formerly appointments)
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: number, booking: Partial<Booking>): Promise<Booking | undefined>;
  deleteBooking(id: number): Promise<boolean>;
  listBookings(): Promise<Booking[]>;
  listBookingsByCustomer(customerId: number): Promise<Booking[]>;
  listBookingsByProvider(providerId: number): Promise<Booking[]>;
  
  // Provider profile methods
  getProviderProfile(id: number): Promise<ProviderProfile | undefined>;
  getProviderProfileByUserId(userId: number): Promise<ProviderProfile | undefined>;
  createProviderProfile(profile: InsertProviderProfile): Promise<ProviderProfile>;
  updateProviderProfile(id: number, profile: Partial<ProviderProfile>): Promise<ProviderProfile | undefined>;
  
  // Service category methods
  getServiceCategory(id: number): Promise<ServiceCategory | undefined>;
  createServiceCategory(category: InsertServiceCategory): Promise<ServiceCategory>;
  listServiceCategories(): Promise<ServiceCategory[]>;
  
  // Provider service methods
  getProviderService(id: number): Promise<ProviderService | undefined>;
  createProviderService(service: InsertProviderService): Promise<ProviderService>;
  listProviderServices(providerId: number): Promise<ProviderService[]>;
  listProviderServicesByCategory(categoryId: number): Promise<ProviderService[]>;
  
  // Location methods
  getLocation(id: number): Promise<Location | undefined>;
  createLocation(location: InsertLocation): Promise<Location>;
  listLocations(parentId?: number): Promise<Location[]>;
  
  // Service area methods
  createProviderServiceArea(area: InsertProviderServiceArea): Promise<ProviderServiceArea>;
  listProviderServiceAreas(providerId: number): Promise<ProviderServiceArea[]>;
  
  // Payment methods
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPayment(id: number): Promise<Payment | undefined>;
  getPaymentByBooking(bookingId: number): Promise<Payment | undefined>;
  updatePayment(id: number, payment: Partial<Payment>): Promise<Payment | undefined>;
  
  // Review methods
  createReview(review: InsertReview): Promise<Review>;
  getReview(id: number): Promise<Review | undefined>;
  getReviewsByProvider(providerId: number): Promise<Review[]>;
  
  // Message methods
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(userId: number): Promise<Message[]>;
  getBookingMessages(bookingId: number): Promise<Message[]>;
  markMessageAsRead(id: number): Promise<Message | undefined>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async getUserByClerkId(clerkId: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.clerkId, clerkId));
    return result[0];
  }

  async createUser(userData: InsertUser): Promise<User> {
    const result = await db.insert(users).values(userData).returning();
    return result[0];
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const now = new Date();
    const result = await db
      .update(users)
      .set({ ...userData, updatedAt: now })
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id));
    return !!result;
  }

  async listUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(asc(users.id));
  }

  async listUsersByRole(role: string): Promise<User[]> {
    return await db.select().from(users).where(eq(users.role, role as any)).orderBy(asc(users.id));
  }

  // Booking methods (formerly appointments)
  async getBooking(id: number): Promise<Booking | undefined> {
    const result = await db.select().from(bookings).where(eq(bookings.id, id));
    return result[0];
  }

  async createBooking(bookingData: InsertBooking): Promise<Booking> {
    const result = await db.insert(bookings).values(bookingData).returning();
    return result[0];
  }

  async updateBooking(id: number, bookingData: Partial<Booking>): Promise<Booking | undefined> {
    const now = new Date();
    const result = await db
      .update(bookings)
      .set({ ...bookingData, updatedAt: now })
      .where(eq(bookings.id, id))
      .returning();
    return result[0];
  }

  async deleteBooking(id: number): Promise<boolean> {
    const result = await db.delete(bookings).where(eq(bookings.id, id));
    return !!result;
  }

  async listBookings(): Promise<Booking[]> {
    return await db.select().from(bookings).orderBy(desc(bookings.startTime));
  }

  async listBookingsByCustomer(customerId: number): Promise<Booking[]> {
    return await db
      .select()
      .from(bookings)
      .where(eq(bookings.customerId, customerId))
      .orderBy(desc(bookings.startTime));
  }

  async listBookingsByProvider(providerId: number): Promise<Booking[]> {
    return await db
      .select()
      .from(bookings)
      .where(eq(bookings.providerId, providerId))
      .orderBy(desc(bookings.startTime));
  }
  
  // Provider profile methods
  async getProviderProfile(id: number): Promise<ProviderProfile | undefined> {
    const result = await db.select().from(providerProfiles).where(eq(providerProfiles.id, id));
    return result[0];
  }
  
  async getProviderProfileByUserId(userId: number): Promise<ProviderProfile | undefined> {
    const result = await db.select().from(providerProfiles).where(eq(providerProfiles.userId, userId));
    return result[0];
  }
  
  async createProviderProfile(profile: InsertProviderProfile): Promise<ProviderProfile> {
    const result = await db.insert(providerProfiles).values(profile).returning();
    return result[0];
  }
  
  async updateProviderProfile(id: number, profile: Partial<ProviderProfile>): Promise<ProviderProfile | undefined> {
    const now = new Date();
    const result = await db
      .update(providerProfiles)
      .set({ ...profile, updatedAt: now })
      .where(eq(providerProfiles.id, id))
      .returning();
    return result[0];
  }
  
  // Service category methods
  async getServiceCategory(id: number): Promise<ServiceCategory | undefined> {
    const result = await db.select().from(serviceCategories).where(eq(serviceCategories.id, id));
    return result[0];
  }
  
  async createServiceCategory(category: InsertServiceCategory): Promise<ServiceCategory> {
    const result = await db.insert(serviceCategories).values(category).returning();
    return result[0];
  }
  
  async listServiceCategories(): Promise<ServiceCategory[]> {
    return await db.select().from(serviceCategories).orderBy(asc(serviceCategories.name));
  }
  
  // Provider service methods
  async getProviderService(id: number): Promise<ProviderService | undefined> {
    const result = await db.select().from(providerServices).where(eq(providerServices.id, id));
    return result[0];
  }
  
  async createProviderService(service: InsertProviderService): Promise<ProviderService> {
    const result = await db.insert(providerServices).values(service).returning();
    return result[0];
  }
  
  async listProviderServices(providerId: number): Promise<ProviderService[]> {
    return await db
      .select()
      .from(providerServices)
      .where(eq(providerServices.providerId, providerId))
      .orderBy(asc(providerServices.title));
  }
  
  async listProviderServicesByCategory(categoryId: number): Promise<ProviderService[]> {
    return await db
      .select()
      .from(providerServices)
      .where(eq(providerServices.categoryId, categoryId))
      .orderBy(asc(providerServices.title));
  }
  
  // Location methods
  async getLocation(id: number): Promise<Location | undefined> {
    const result = await db.select().from(locations).where(eq(locations.id, id));
    return result[0];
  }
  
  async createLocation(location: InsertLocation): Promise<Location> {
    const result = await db.insert(locations).values(location).returning();
    return result[0];
  }
  
  async listLocations(parentId?: number): Promise<Location[]> {
    if (parentId) {
      return await db
        .select()
        .from(locations)
        .where(eq(locations.parentId, parentId))
        .orderBy(asc(locations.name));
    } else {
      return await db
        .select()
        .from(locations)
        .where(sql`${locations.parentId} IS NULL`)
        .orderBy(asc(locations.name));
    }
  }
  
  // Service area methods
  async createProviderServiceArea(area: InsertProviderServiceArea): Promise<ProviderServiceArea> {
    const result = await db.insert(providerServiceAreas).values(area).returning();
    return result[0];
  }
  
  async listProviderServiceAreas(providerId: number): Promise<ProviderServiceArea[]> {
    return await db
      .select()
      .from(providerServiceAreas)
      .where(eq(providerServiceAreas.providerId, providerId));
  }
  
  // Payment methods
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const result = await db.insert(payments).values(payment).returning();
    return result[0];
  }
  
  async getPayment(id: number): Promise<Payment | undefined> {
    const result = await db.select().from(payments).where(eq(payments.id, id));
    return result[0];
  }
  
  async getPaymentByBooking(bookingId: number): Promise<Payment | undefined> {
    const result = await db.select().from(payments).where(eq(payments.bookingId, bookingId));
    return result[0];
  }
  
  async updatePayment(id: number, payment: Partial<Payment>): Promise<Payment | undefined> {
    const now = new Date();
    const result = await db
      .update(payments)
      .set({ ...payment, updatedAt: now })
      .where(eq(payments.id, id))
      .returning();
    return result[0];
  }
  
  // Review methods
  async createReview(review: InsertReview): Promise<Review> {
    const result = await db.insert(reviews).values(review).returning();
    return result[0];
  }
  
  async getReview(id: number): Promise<Review | undefined> {
    const result = await db.select().from(reviews).where(eq(reviews.id, id));
    return result[0];
  }
  
  async getReviewsByProvider(providerId: number): Promise<Review[]> {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.providerId, providerId))
      .orderBy(desc(reviews.createdAt));
  }
  
  // Message methods
  async createMessage(message: InsertMessage): Promise<Message> {
    const result = await db.insert(messages).values(message).returning();
    return result[0];
  }
  
  async getMessages(userId: number): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(
        sql`${messages.senderId} = ${userId} OR ${messages.receiverId} = ${userId}`
      )
      .orderBy(desc(messages.createdAt));
  }
  
  async getBookingMessages(bookingId: number): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.bookingId, bookingId))
      .orderBy(asc(messages.createdAt));
  }
  
  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const result = await db
      .update(messages)
      .set({ isRead: true })
      .where(eq(messages.id, id))
      .returning();
    return result[0];
  }
}

// Export instance for use in routes
export const storage = new DatabaseStorage();
