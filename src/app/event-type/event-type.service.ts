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

  create(eventType: EventTypeRequestDto): Observable<EventType> {
    return this.httpClient.post<EventType>(`${environment.apiHost}/event-types`, eventType);
  }
}
