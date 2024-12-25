import { Injectable } from '@angular/core';
import { Event } from './model/event.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { PagedResponse } from '../shared/model/paged-response.model';
import { CreateEventRequestDto } from './model/create-event-request.model';
import { InvitationResponse } from './model/invitation-response.model';
import {EventType} from '../event-type/model/event-type.model';
import { EventSummary } from './model/event-summary.model';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  private event: CreateEventRequestDto

  constructor(private httpClient: HttpClient) { }

  getAll(pageProperties?: any) : Observable<PagedResponse<EventSummary>> {
    let params = new HttpParams();
    if (pageProperties){
      params = params
      .set('page', pageProperties.pageIndex)
      .set('size', pageProperties.pageSize)
    }
    return this.httpClient.get<PagedResponse<EventSummary>>(environment.apiHost + "/events", { params: params });
  }

  getTopEvents(): Observable<EventSummary[]> {
    return this.httpClient.get<EventSummary[]>(environment.apiHost + "/events/top-five-events")
  }

  searchEvents(keyword: string, pageProperties?: any): Observable<PagedResponse<EventSummary>> {
    let params = new HttpParams()
    if (pageProperties){
      params = params
      .set('keyword', keyword)
      .set('page', pageProperties.pageIndex)
      .set('size', pageProperties.pageSize);
    }
    return this.httpClient.get<PagedResponse<EventSummary>>(environment.apiHost + "/events/search", {params: params})
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

  verifyInvitation(hash: string): Observable<void> {
    return this.httpClient.get<void>(`${environment.apiHost}/invitations/verification/${hash}`)
  }

  getInvitation(hash: string): Observable<InvitationResponse>{
    return this.httpClient.get<InvitationResponse>(`${environment.apiHost}/invitations/${hash}`)
  }
  
}

