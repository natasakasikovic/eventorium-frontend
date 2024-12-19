import {ReservationType} from './reservation-type.enum';
import {Category} from '../../category/model/category.model';
import {EventType} from '../../event-type/model/event-type.model';

export interface Service {
  id: number;
  name: string;
  category: Category;
  price: number;
  rating: number;
  eventTypes: EventType[];
  provider: string;
  minDuration: number;
  maxDuration: number;
  description: string;
  specialties: string;
  reservationDeadline: Date;
  cancellationDeadline: Date;
  discount: number;
  isVisible: boolean;
  isAvailable: boolean;
  type: ReservationType
  images: string[];
}
