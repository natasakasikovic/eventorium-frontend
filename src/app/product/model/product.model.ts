import {EventType} from '../../event-type/model/event-type.model';
import {Category} from '../../category/model/category.model';
import {UserDetails} from '../../user/model/user-details.model';
import {CompanyResponse} from '../../company/model/company-response.model';

export interface Product {
  id: number;
  name: string;
  description: string;
  specialties: string;
  price: number;
  discount: number;
  status: string;
  available: boolean;
  visible: boolean;
  eventTypes: EventType[];
  category: Category;
  images: string[];
  rating: number;
  provider: UserDetails;
  company: CompanyResponse;
}
