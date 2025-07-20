import {AuthRequest} from '../../app/auth/model/auth-request.model';
import {PersonRequest} from '../../app/auth/model/person.request.model';
import {rolesMock} from './roles.mock';
import {citiesMock} from './city.mock';
import {Role} from '../../app/auth/model/user-role.model';

const validPersonRequestMock: PersonRequest = {
  name: 'Test',
  lastname: 'Test',
  phoneNumber: '+38165234576',
  address: 'Test, 10',
  city: citiesMock[0],
  profilePhoto: null
}

export const validAuthRequestMock: AuthRequest = {
  email: 'test@test.com',
  password: '123456789',
  passwordConfirmation: '123456789',
  roles: [rolesMock[0]],
  person: validPersonRequestMock
}

export function mockValidAuthRequest(role: Role): AuthRequest {
  validAuthRequestMock.roles = [role];
  return validAuthRequestMock;
}
