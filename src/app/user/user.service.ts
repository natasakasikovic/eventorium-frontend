import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountDetails } from './model/account-details.model';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { Person } from './model/person.model';
import { ChangePasswordRequest } from './model/change-password-request.model';
import { UserReport } from './model/user-report.model';
import { UserReportResponse } from './model/user-report-response.model';
import { UpdateReportRequest } from './model/update-report-status.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  
  getCurrentUser(): Observable<AccountDetails> {
    return this.httpClient.get<AccountDetails>(`${environment.apiHost}/users/me`)
  }

  getUser(id: number): Observable<AccountDetails> {
    return this.httpClient.get<AccountDetails>(`${environment.apiHost}/users/${id}`)
  }

  getProfilePhoto(id: number): Observable<Blob> {
    return this.httpClient.get(`${environment.apiHost}/users/${id}/profile-photo`,
      { responseType: 'blob' }
    ) as Observable<Blob>;
  }

  update(person: Person): Observable<void> {
    return this.httpClient.put<void>(`${environment.apiHost}/users`, person);
  }

  updateProfilePhoto(photo: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('profilePhoto', photo)
    return this.httpClient.put<string>(`${environment.apiHost}/users/profile-photo`,
      formData,
      { responseType: 'text' as 'json' });
  }

  changePassword(request: ChangePasswordRequest) : Observable<void> {
    return this.httpClient.post<void>(`${environment.apiHost}/users/password`, request);
  }

  reportUser(report: UserReport, id: number) : Observable<void> {
    return this.httpClient.post<void>(`${environment.apiHost}/user-reports/${id}`, report)
  }

  updateReportStatus(id: number, request: UpdateReportRequest) : Observable<void> {
    return this.httpClient.patch<void>(`${environment.apiHost}/user-reports/${id}`, request) 
  }

  getReports(): Observable<UserReportResponse[]> {
    return this.httpClient.get<UserReportResponse[]>(`${environment.apiHost}/user-reports`)
  }
}
