import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from './model/auth-response.model';
import { environment } from '../../env/environment';
import { Login } from './model/login.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRole } from './model/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  user$ = new BehaviorSubject<UserRole | null>(null);
  userState = this.user$.asObservable();


  constructor(private http: HttpClient) {
    this.user$.next(this.getRole())
  }

  login(auth: Login): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(environment.apiHost + '/auth/login', auth, {
        headers: this.headers,
      })
  }

  getRole(): UserRole {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      return this.mapRole(helper.decodeToken(accessToken).role);
    }
    return null;
  }
  
  private mapRole(roleIndex: number): UserRole {
    switch (roleIndex) {
      case 0:
        return UserRole.AUTHENTICATED_USER;
      case 1:
        return UserRole.UNAUTHENTICATED_USER;
      case 2:
        return UserRole.ADMIN;
      case 3:
        return UserRole.PROVIDER;
      case 4:
        return UserRole.EVENT_ORGANIZER;
      default:
        return UserRole.UNAUTHENTICATED_USER; 
    }
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
}
