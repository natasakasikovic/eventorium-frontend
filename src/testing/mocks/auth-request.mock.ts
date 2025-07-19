import {AuthRequest} from '../../app/auth/model/auth-request.model';
import {PersonRequest} from '../../app/auth/model/person.request.model';
import {rolesMock} from './roles.mock';
import {citiesMock} from './city.mock';

const validPersonRequestMock: PersonRequest = {
  name: 'test',
  lastname: 'test',
  phoneNumber: '+385645645145',
  address: 'test',
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
