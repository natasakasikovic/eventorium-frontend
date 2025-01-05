import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountDetails } from './model/account-details.model';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { Person } from './model/person.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    constructor(private httpClient: HttpClient) {}
  
    getCurrentUser(): Observable<AccountDetails> {
      return this.httpClient.get<AccountDetails>(`${environment.apiHost}/users/me`)
    }

    getProfilePhoto(id: number): Observable<Blob> {
      return this.httpClient.get(`${environment.apiHost}/users/${id}/profilePhoto`,
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
}
