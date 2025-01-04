import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from './model/auth-response.model';
import { environment } from '../../env/environment';
import { Login } from './model/login.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { QuickRegistrationDto } from './model/quick-registration.model';
import { Role } from './model/user-role.model';
import { AuthRequestDto } from './model/auth-request.model';
import { Router } from '@angular/router';

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


  constructor(private http: HttpClient, private router: Router) {
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

  getUserId(): String {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken).userId;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.user$.next(null);
    if (this.router.url != '/home')
      this.router.navigate([''])
    else window.location.reload();
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }

  quickRegister(user: QuickRegistrationDto): Observable<void> {
    return this.http.post<void>(environment.apiHost + "/auth/quick-registration", user)
  }

  getRegistrationOptions() : Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.apiHost}/roles/registration-options`)
  }

  registerUser(user: AuthRequestDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiHost}/auth/registration`, user)
  }

  uploadProfilePhoto(userId: number, photo: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('profilePhoto', photo)
    return this.http.post<string>(`${environment.apiHost}/auth/${userId}/profile-photo`,
      formData,
      { responseType: 'text' as 'json' });
  }
}
