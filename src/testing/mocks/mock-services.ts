import {CreateServiceRequestDto} from '../../app/service/model/create-service-dto.model';
import {mockEventTypes} from './mock-event-types';
import {ReservationType} from '../../app/service/model/reservation-type.enum';
import {mockCategories} from './mock-categories';

export const mockValidService: CreateServiceRequestDto = {
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
