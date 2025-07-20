import {CreateService} from '../../app/service/model/create-service.model';
import {eventTypesMock} from './event-type.mock';
import {ReservationType} from '../../app/service/model/reservation-type.enum';
import {categoriesMock} from './category.mock';
import {InvalidTestCase} from '../util/form-validation.utils';

export const mockValidServiceForm: CreateService = {
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

export const invalidCreateServiceFormTestCases: InvalidTestCase[] = [
  { field: 'name', invalidValue: '', expectedError: 'required' },
  { field: 'price', invalidValue: '', expectedError: 'required' },
  { field: 'price', invalidValue: -1, expectedError: 'min' },
  { field: 'discount', invalidValue: '', expectedError: 'required' },
  { field: 'discount', invalidValue: -5, expectedError: 'min' },
  { field: 'discount', invalidValue: 105, expectedError: 'max' },
  { field: 'description', invalidValue: '', expectedError: 'required' },
  { field: 'specialties', invalidValue: '', expectedError: 'required' },
  { field: 'eventTypes', invalidValue: [], expectedError: 'minSelected' },
  { field: 'type', invalidValue: '', expectedError: 'required' },
  { field: 'reservationDeadline', invalidValue: '', expectedError: 'required' },
  { field: 'reservationDeadline', invalidValue: 0, expectedError: 'min' },
  { field: 'reservationDeadline', invalidValue: -2, expectedError: 'min' },
  { field: 'cancellationDeadline', invalidValue: '', expectedError: 'required' },
  { field: 'cancellationDeadline', invalidValue: 0, expectedError: 'min' },
  { field: 'cancellationDeadline', invalidValue: -3, expectedError: 'min' },
  { field: 'minDuration', invalidValue: 0, expectedError: 'min' },
  { field: 'minDuration', invalidValue: -5, expectedError: 'min' },
  { field: 'maxDuration', invalidValue: 25, expectedError: 'max' },
  { field: 'maxDuration', invalidValue: 100, expectedError: 'max' },
];

