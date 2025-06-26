import {EventType} from '../../event-type/model/event-type.model';
import {Category} from '../../category/model/category.model';
import {ReservationType} from './reservation-type.enum';

export interface CreateService {
  name: string;
  description: string;
  specialties: string;
  price: number;
  discount: number;
  eventTypes: EventType[];
  category: Category;
  type: ReservationType;
  reservationDeadline: number;
  cancellationDeadline: number;
  minDuration: number;
  maxDuration: number;
  isAvailable: boolean;
  isVisible: boolean;
}
