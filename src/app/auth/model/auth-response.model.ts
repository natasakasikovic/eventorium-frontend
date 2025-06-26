
export interface AuthResponse {
  id: number;
  email: string;
  name: string;
  lastname: string;
  phoneNumber: string;
  address: string;
  city: string;
  role: String[];
  jwt: string;
}
