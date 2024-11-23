import {Confirmation} from './confirmation.enum';

export interface Service {
  id: number;
  name: string;
  categoryName: string;
  price: number;
  rating: number;
  eventTypes: string[];
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
  image: string;
}
