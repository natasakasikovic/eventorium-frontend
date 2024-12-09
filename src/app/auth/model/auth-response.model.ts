import { UserRole } from "./user-role.enum";

export interface AuthResponse {
  id: number;
  email: string;
  name: string;
  lastname: string;
  phoneNumber: string;
  address: string;
  city: string;
  role: UserRole;
  jwt: string;
  }
  