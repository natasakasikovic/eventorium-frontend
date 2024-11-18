export interface Service {
  id: string;
  name: string;
  categoryName: string;
  price: number;
  rating: number;
  eventType: string;
  provider: string;
  duration: number;
  description: string;
  specialties: string;
  reservationDeadline: Date;
  cancellationDeadline: Date;
}
