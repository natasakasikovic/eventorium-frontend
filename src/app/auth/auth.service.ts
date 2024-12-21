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

  getRegistrationOptions() : Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.apiHost}/roles/registration-options`)
  }

  registerUser(user: AuthRequestDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiHost}/auth/registration`, user).pipe(
      tap(() => {
        console.log('Account registered successfully');
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  uploadProfilePhoto(userId: number, photo: File): Observable<string> {
    const formData: FormData = new FormData();
    const fileType = '.' + photo.type.split('/')[1];
    formData.append('profilePhoto', photo, userId.toString() + fileType)
    return this.http.post<string>(`${environment.apiHost}/auth/${userId}/profile-photo`, 
      formData,
      { responseType: 'text' as 'json' });
  }
}
