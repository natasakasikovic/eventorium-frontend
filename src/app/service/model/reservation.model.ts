export interface Reservation {
  id: number;
  eventId: number;
  eventName: string;
  serviceId: number;
  serviceName: string;
  date: Date;
  startingTime: string;
  endingTime: string;
}
