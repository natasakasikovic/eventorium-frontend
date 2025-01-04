import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountDetails } from './model/account-details.model';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient) { }
  
    getCurrentUser(): Observable<AccountDetails> {
      return this.httpClient.get<AccountDetails>(`${environment.apiHost}/users/me`)
    }

    getProfilePhoto(id: number): Observable<Blob> {
      return this.httpClient.get(`${environment.apiHost}/users/${id}/profilePhoto`,
        { responseType: 'blob' }
      ) as Observable<Blob>;
    }
}
