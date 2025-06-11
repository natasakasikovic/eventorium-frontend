import { Injectable } from '@angular/core';
import { Event } from './model/event.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { environment } from '../../env/environment';
import { PagedResponse } from '../shared/model/paged-response.model';
import { CreateEventRequestDto } from './model/create-event-request.model';
import { CreatedEvent } from './model/created-event-response.model';
import { InvitationResponse } from './model/invitation-response.model';
import { EventType } from '../event-type/model/event-type.model';
import { EventSummary } from './model/event-summary.model';
import { ActivityRequest } from './model/activity-request.model';
import { Privacy } from './model/privacy.enum';
import { Invitation } from './model/invitation-request.model';
import { EventFilter } from './model/event-filter.model';
import { PageProperties } from '../shared/model/page-properties.model';
import { EventDetails } from './model/event-details.model';
import { Activity } from './model/activity.model';
import { InvitationDetails } from './model/invitation-details.model';
import { UpdateEventRequest } from './model/update-event-request.model';
import { EventTable } from './model/event-table.model';
import { EventRatingsStatistics } from './model/event-rating-statistics.model';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  private eventTypeSubject = new BehaviorSubject<EventType | null>(null);
  eventType$ = this.eventTypeSubject.asObservable();

  private eventPrivacySubject = new BehaviorSubject<Privacy>(Privacy.OPEN);
  eventPrivacy$ = this.eventPrivacySubject.asObservable();

  private events: Event[] = []
  private event: CreateEventRequestDto

  constructor(private httpClient: HttpClient) { }

  getEventDetails(id: number) : Observable<EventDetails> {
    return this.httpClient.get<EventDetails>(`${environment.apiHost}/events/${id}/details`)
  }

  isUserEligableToRate(id: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.apiHost}/account/events/${id}/rating-eligibility`)
  }

  setEventType(eventType: EventType): void {
    this.eventTypeSubject.next(eventType);
  }

  setEventPrivacy(privacy: Privacy): void {
    this.eventPrivacySubject.next(privacy);
  }

  getEvent(id: number): Observable<Event> {
    return this.httpClient.get<Event>(`${environment.apiHost}/events/${id}`)
  }

  getEventType(): EventType | null {
    return this.eventTypeSubject.value;
  }

  getEventPrivacy(): Privacy {
    return this.eventPrivacySubject.value;
  }

  getAll(pageProperties?: PageProperties) : Observable<PagedResponse<EventSummary>> {
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

  getPassedEvents(): Observable<EventTable[]> {
    return this.httpClient.get<EventTable[]>(`${environment.apiHost}/events/passed`);
  }

  getEventStatistics(id: number): Observable<EventRatingsStatistics> {
    return this.httpClient.get<EventRatingsStatistics>(`${environment.apiHost}/events/${id}/statistics`);
  }

  searchEvents(keyword: string, pageProperties?: PageProperties): Observable<PagedResponse<EventSummary>> {
    let params = new HttpParams()
    if (pageProperties){
      params = params
      .set('keyword', keyword)
      .set('page', pageProperties.pageIndex)
      .set('size', pageProperties.pageSize);
    }
    return this.httpClient.get<PagedResponse<EventSummary>>(environment.apiHost + "/events/search", {params: params})
  }

  createEvent(event: CreateEventRequestDto): Observable<CreatedEvent> {
    return this.httpClient.post<CreatedEvent>(`${environment.apiHost}/events`, event)
  }

  verifyInvitation(hash: string): Observable<void> {
    return this.httpClient.get<void>(`${environment.apiHost}/invitations/verification/${hash}`)
  }

  getInvitation(hash: string): Observable<InvitationResponse>{
    return this.httpClient.get<InvitationResponse>(`${environment.apiHost}/invitations/${hash}`)
  }

  createAgenda(activities: ActivityRequest[], id: number):  Observable<void> {
    return this.httpClient.put<void>(`${environment.apiHost}/events/${id}/agenda`, activities);
  }

  sendInvitations(invitations: Invitation[], id: number): Observable<void> {
    return this.httpClient.post<void> (`${environment.apiHost}/invitations/${id}`, invitations)
  }

  updateEvent(id: number, request: UpdateEventRequest): Observable<void> {
    return this.httpClient.put<void>(`${environment.apiHost}/events/${id}`, request);
  }

  filterEvents(filter: EventFilter, pageProperties: PageProperties): Observable<PagedResponse<EventSummary>> {
    const params = this.buildQueryParams(filter, pageProperties);
    return this.httpClient.get<PagedResponse<EventSummary>>(`${environment.apiHost}/events/filter`, { params } );
  }

  buildQueryParams(filter: EventFilter, pageProperties: PageProperties): HttpParams {
    let params = new HttpParams();

    if (filter) {
      Object.keys(filter).forEach((key) => {
        const typedKey = key as keyof EventFilter;
        const value = filter[typedKey];

        if (value !== undefined && value != null && value != "")
          params = params.set(typedKey, value);
      });
    }

    if (pageProperties)
      params = params.set('page', pageProperties.pageIndex).set('size', pageProperties.pageSize);

    return params
  }

  getDraftedEvents(): Observable<EventSummary[]> {
    return this.httpClient.get<EventSummary[]>(`${environment.apiHost}/events/drafted`);
  }

  getAllOrganizerEvents(): Observable<EventSummary[]> {
    return this.httpClient.get<EventSummary[]>(`${environment.apiHost}/account/events/all`);
  }

  isFavourite(id: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.apiHost}/account/events/favourites/${id}`);
  }

  addToFavourites(id: number): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiHost}/account/events/favourites/${id}`, null);
  }

  removeFromFavourites(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiHost}/account/events/favourites/${id}`);
  }

  addToCalendar(id: number): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiHost}/account/events/${id}/attendance`, null);
  }

  getAgenda(id: number): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(`${environment.apiHost}/events/${id}/agenda`);
  }

  exportToPDF(id: number): Observable<Blob> {
    return this.httpClient.get(`${environment.apiHost}/events/${id}/pdf`, { responseType: 'blob' });
  }

  getInvitations(): Observable<InvitationDetails[]> {
    return this.httpClient.get<InvitationDetails[]>(`${environment.apiHost}/invitations/my-invitations`);
  }

  exportGuestListToPDF(id: number): Observable<Blob> {
    return this.httpClient.get(`${environment.apiHost}/events/${id}/guest-list-pdf`, { responseType: 'blob' });
  }
  
  getOrganizerEvents(pageProperties: PageProperties): Observable<PagedResponse<EventSummary>> {
    const params = this.buildQueryParams(null, pageProperties);
    return this.httpClient.get<PagedResponse<EventSummary>>(`${environment.apiHost}/account/events`, { params: params });
  }

  searchOrganizerEvents(keyword: string, pageProperties?: PageProperties): Observable<PagedResponse<EventSummary>> {
    let params = new HttpParams();
    if (pageProperties) {
      params = params
        .set('keyword', keyword)
        .set('page', pageProperties.pageIndex)
        .set('size', pageProperties.pageSize)
    }
    return this.httpClient.get<PagedResponse<EventSummary>>(`${environment.apiHost}/account/events/search`, {params: params})
  }

}
