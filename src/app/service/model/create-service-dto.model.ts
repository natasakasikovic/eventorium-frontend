import {EventType} from '../../event-type/model/event-type.model';
import {Category} from '../../category/model/category.model';
import {ReservationType} from './reservation-type.enum';

export interface CreateServiceRequestDto {
  name: string;
  description: string;
  specialties: string;
  price: number;
  discount: number;
  eventTypes: EventType[];
  category: Category;
  type: ReservationType;
  reservationDeadline: Date;
  cancellationDeadline: Date;
  minDuration: number;
  maxDuration: number;
}
