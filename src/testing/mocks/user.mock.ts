import { AuthResponse } from "../../app/auth/model/auth-response.model";

export const mockValidAuthResponse: AuthResponse = {
  id: 1,
  email: 'test@test.com',
  role: ['EVENT_ORGANIZER'],
  name: 'Test',
  lastname: 'Test',
  phoneNumber: '+38165234576',
  address: 'Test, 10',
  city: 'Beograd',
  jwt: 'testjwt'
}
