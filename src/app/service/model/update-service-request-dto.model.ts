import {ReservationType} from './reservation-type.enum';

export interface UpdateServiceRequestDto {
  name: string;
  description: string;
  specialties: string;
  price: number;
  discount: number;
  eventTypesIds: number[];
  type: ReservationType;
  reservationDeadline: number;
  cancellationDeadline: number;
  minDuration: number;
  maxDuration: number;
  available: boolean;
  visible: boolean;
}
