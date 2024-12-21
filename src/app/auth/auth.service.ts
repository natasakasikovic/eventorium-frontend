import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from './model/auth-response.model';
import { environment } from '../../env/environment';
import { Login } from './model/login.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { QuickRegistrationDto } from './model/quick-registration.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  user$ = new BehaviorSubject<String | null>(null);
  userState = this.user$.asObservable();


  constructor(private http: HttpClient) {
    this.user$.next(this.getRole())
  }

  login(auth: Login): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(environment.apiHost + '/auth/login', auth, {
        headers: this.headers,
      })
  }

  getRole(): String {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken).roles[0];
    }
    return null;
  }
  
  logout(): void {
    localStorage.removeItem('user');
    this.user$.next(null);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }

  quickRegister(user: QuickRegistrationDto): Observable<String> {
    return this.http.post<String>(environment.apiHost + "/auth/quick-registration", user)
  }

}
