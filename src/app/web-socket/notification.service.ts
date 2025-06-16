import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotificationResponse} from './notifications/notifications-response.model';
import {environment} from '../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  getNotifications(): Observable<NotificationResponse[]> {
    return this.httpClient.get<NotificationResponse[]>(`${environment.apiHost}/notifications`);
  }

  getSilenceStatus(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.apiHost}/notifications/silence`);
  }

  updateSilence(silence: boolean): Observable<void> {
    const params = new HttpParams().set("silence", silence);
    return this.httpClient.patch<void>(`${environment.apiHost}/notifications/silence`, {}, { params });
  }

  markAsSeen(): Observable<void> {
    return this.httpClient.patch<void>(`${environment.apiHost}/notifications/seen`, {});
  }
}
