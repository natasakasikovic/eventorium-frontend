import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { CalendarEvent } from './model/calendar-event.model';
import { CalendarReservation } from './model/calendar-reservation.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private httpClient: HttpClient) { }

  getAttendingEvents(): Observable<CalendarEvent[]> {
    return this.httpClient.get<CalendarEvent[]>(`${environment.apiHost}/account/events/my-attending-events`);
  }

  getServiceReservations(): Observable<CalendarReservation[]> {
    return this.httpClient.get<CalendarReservation[]>(`${environment.apiHost}/provider-reservations`);
  } 
}
