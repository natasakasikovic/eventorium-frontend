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

  uploadImage(id: number, image: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('image', image)
    return this.httpClient.post<string>(`${environment.apiHost}/event-types/${id}/image`,
      formData,
      { responseType: 'text' as 'json' });
  }

  updateImage(id: number, image: File): Observable<void> {
    const formData: FormData = new FormData();
    formData.append('image', image)
    return this.httpClient.put<void>(`${environment.apiHost}/event-types/${id}/image`,
      formData,
      { responseType: 'text' as 'json' }
    );
  }

  getImage(id: number): Observable<Blob> {
    return this.httpClient.get(`${environment.apiHost}/event-types/${id}/image`,
      { responseType: 'blob' }
    ) as Observable<Blob>;
  }
}
