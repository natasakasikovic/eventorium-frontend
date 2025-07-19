import {CreateService} from '../../app/service/model/create-service.model';
import {eventTypesMock} from './event-type.mock';
import {ReservationType} from '../../app/service/model/reservation-type.enum';
import {categoriesMock} from './category.mock';

export const validServiceMock: CreateService = {
  name: 'Test Service',
  price: 100,
  discount: 10,
  description: 'Test Description',
  specialties: 'Photography',
  eventTypes: [eventTypesMock[0]],
  type: ReservationType.MANUAL,
  category: categoriesMock[0],
  isVisible: true,
  isAvailable: true,
  reservationDeadline: 3,
  cancellationDeadline: 2,
  minDuration: 2,
  maxDuration: 5
}
