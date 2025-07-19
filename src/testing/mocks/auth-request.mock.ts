import {AuthRequest} from '../../app/auth/model/auth-request.model';
import {PersonRequest} from '../../app/auth/model/person.request.model';
import {mockRoles} from './mock-roles.mock';
import {mockCities} from './city.mock';

const mockValidPersonRequest: PersonRequest = {
  name: 'test',
  lastname: 'test',
  phoneNumber: '+385645645145',
  address: 'test',
  city: mockCities[0],
  profilePhoto: null
}

export const mockValidAuthRequest: AuthRequest = {
  email: 'test@test.com',
  password: '123456789',
  passwordConfirmation: '123456789',
  roles: [mockRoles[0]],
  person: mockValidPersonRequest
}
