import {ReservationType} from './reservation-type.enum';

export interface UpdateServiceRequestDto {
  name: string;
  description: string;
  specialties: string;
  price: number;
  discount: number;
  eventTypesIds: number[];
  type: ReservationType;
  reservationDeadline: Date;
  cancellationDeadline: Date;
  minDuration: number;
  maxDuration: number;
  isAvailable: boolean;
  isVisible: boolean;
}
