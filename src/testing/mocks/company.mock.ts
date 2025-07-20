import {citiesMock} from './city.mock';
import {CompanyResponse} from '../../app/company/model/company-response.model';
import {CompanyRequest} from '../../app/company/model/company-request.model';

export const validCompanyRequestMock: CompanyRequest = {
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

export const validCompanyResponseMock: CompanyResponse = {
  id: 1,
  name: "test"
}
