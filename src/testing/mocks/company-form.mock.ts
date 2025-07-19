import {citiesMock} from './city.mock';
import {InvalidTestCase} from '../util/form-validation.utils';

export const validCompanyFormMock = {
  name: "test",
  address: "test",
  city: citiesMock[0],
  phoneNumber: "+879645879465",
  description: "test",
  email: "test@test.com",
  openingHours: "1:00 PM",
  closingHours: "2:00 PM",
  providerId: 123
}

export const invalidCreationTestCases: InvalidTestCase[] = [
  { field: 'email', invalidValue: '', expectedError: 'required' },
  { field: 'email', invalidValue: 'invalid-email', expectedError: 'email' },
  { field: 'name', invalidValue: '', expectedError: 'required' },
  { field: 'address', invalidValue: '', expectedError: 'required' },
  { field: 'city', invalidValue: '', expectedError: 'required' },
  { field: 'phoneNumber', invalidValue: '', expectedError: 'required' },
  { field: 'phoneNumber', invalidValue: '123', expectedError: 'pattern' },
  { field: 'phoneNumber', invalidValue: 'abcdefg', expectedError: 'pattern' },
  { field: 'description', invalidValue: '', expectedError: 'required' },
  { field: 'openingHours', invalidValue: '', expectedError: 'required' },
  { field: 'closingHours', invalidValue: '', expectedError: 'required' }
]
