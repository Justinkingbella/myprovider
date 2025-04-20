import { User, Appointment } from "@shared/schema";

// Additional frontend-specific types

export interface UserWithAppointments extends User {
  appointments?: Appointment[];
}

export interface DashboardStats {
  totalUsers?: number;
  totalProviders?: number;
  totalCustomers?: number;
  totalAppointments?: number;
  pendingAppointments?: number;
  completedAppointments?: number;
}

export interface AppointmentWithUserInfo extends Appointment {
  provider?: User;
  customer?: User;
}

export type UserRole = "admin" | "provider" | "customer";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  role: UserRole | null;
  error: string | null;
}
