import { mockCities } from "./city.mock";
import {mockRoles} from './roles.mock';

export const mockValidRegistrationForm = {
  email: 'test@test.com',
  password: '123456789',
  passwordConfirmation: '123456789',
  role: mockRoles[0],
  name: 'Test',
  lastname: 'Test',
  phoneNumber: '+38165234576',
  address: 'Test, 10',
  city: mockCities[0]
}

export const invalidRegistrationTestCases = [
  { field: 'name', invalidValue: '', expectedError: 'required' },
  { field: 'lastname', invalidValue: '', expectedError: 'required' },
  { field: 'address', invalidValue: '', expectedError: 'required' },
  { field: 'city', invalidValue: null, expectedError: 'required' },
  { field: 'role', invalidValue: '', expectedError: 'required' },
  { field: 'phoneNumber', invalidValue: '', expectedError: 'required' },
  { field: 'phoneNumber', invalidValue: 'abc', expectedError: 'pattern' },
  { field: 'email', invalidValue: '', expectedError: 'required' },
  { field: 'email', invalidValue: 'invalid_email', expectedError: 'email' },
  { field: 'password', invalidValue: '', expectedError: 'required' },
  { field: 'password', invalidValue: '123', expectedError: 'minlength' }
];
