import {ReservationType} from './reservation-type.enum';
import {Category} from '../../category/model/category.model';
import {EventType} from '../../event-type/model/event-type.model';
import {Status} from '../../category/model/status-enum-ts';
import {Review} from '../../review/model/review.model';
import {CompanyResponse} from '../../company/model/company-response.model';
import {UserDetails} from '../../user/model/user-details.model';

export interface Service {
  id: number;
  name: string;
  category: Category;
  price: number;
  rating: number;
  eventTypes: EventType[];
  provider: UserDetails;
  minDuration: number;
  maxDuration: number;
  description: string;
  specialties: string;
  reservationDeadline: number;
  cancellationDeadline: number;
  discount: number;
  visible: boolean;
  available: boolean;
  type: ReservationType;
  status: Status;
  images: string[];
  reviews: Review[];
  company: CompanyResponse;
}
