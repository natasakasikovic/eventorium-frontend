import {CreateService} from '../../app/service/model/create-service.model';
import {mockEventTypes} from './event-type.mock';
import {ReservationType} from '../../app/service/model/reservation-type.enum';
import {mockCategories} from './category.mock';

export const mockValidService: CreateService = {
  name: 'Test Service',
  price: 100,
  discount: 10,
  description: 'Test Description',
  specialties: 'Photography',
  eventTypes: [mockEventTypes[0]],
  type: ReservationType.MANUAL,
  category: mockCategories[0],
  isVisible: true,
  isAvailable: true,
  reservationDeadline: 3,
  cancellationDeadline: 2,
  minDuration: 2,
  maxDuration: 5
}
