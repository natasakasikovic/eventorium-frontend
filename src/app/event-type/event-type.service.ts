import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventTypeRequestDto } from './model/event-type-request-dto.model';
import { Observable } from 'rxjs';
import { EventType } from './model/event-type.model';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<EventType[]> {
    return this.httpClient.get<EventType[]>(`${environment.apiHost}/event-types/all`);
  }

  create(eventType: EventTypeRequestDto): Observable<EventType> {
    return this.httpClient.post<EventType>(`${environment.apiHost}/event-types`, eventType);
  }

  get(id: number): Observable<EventType> {
    return this.httpClient.get<EventType>(`${environment.apiHost}/event-types/${id}`);
  }

  update(id: number, eventType: EventTypeRequestDto) : Observable<EventType> {
    return this.httpClient.put<EventType>(`${environment.apiHost}/event-types/${id}`, eventType)
  }

  delete(id: number) : Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiHost}/event-types/${id}`);
  }
}
