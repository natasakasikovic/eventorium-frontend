import {Confirmation} from './confirmation.enum';

export interface Service {
  id: string;
  name: string;
  categoryName: string;
  price: number;
  rating: number;
  eventType: string;
  provider: string;
  minDuration: number;
  maxDuration: number;
  description: string;
  specialties: string;
  reservationDeadline: Date;
  cancellationDeadline: Date;
  discount: number;
  visible: boolean;
  available: boolean;
  confirmation: Confirmation
}
