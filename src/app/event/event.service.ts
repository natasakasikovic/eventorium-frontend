import { Injectable } from '@angular/core';
import { Event } from './model/event.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { PagedResponse } from '../shared/model/paged-response.model';
import { CreateEventRequestDto } from './model/create-event-request-dto.model';
import {EventType} from '../event-type/model/event-type.model';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  private events: Event[] = []
  private event: CreateEventRequestDto

  constructor(private httpClient: HttpClient) { }

  getAll(pageProperties?: any) : Observable<PagedResponse<Event>> {
    let params = new HttpParams();
    if (pageProperties){
      params = params
      .set('page', pageProperties.pageIndex)
      .set('size', pageProperties.pageSize)
    }
    return this.httpClient.get<PagedResponse<Event>>(environment.apiHost + "/events", { params: params });
  }

  getTopEvents(): Event[] {
    return this.events.slice(0, 5);
  }

  searchEvents(keyword: string): Event[] {
    return this.events.filter(service => service.name.toLowerCase().includes(keyword.toLowerCase()));
  }

  updateEvent(event: Partial<CreateEventRequestDto>): void {
    this.event = {...event, ...this.event}
  }

  get eventType(): EventType {
    return this.event.eventType;
  }

  createEvent(): Observable<Event> {
    return this.httpClient.post<Event>(`${environment.apiHost}/events`, this.event)
  }
}

