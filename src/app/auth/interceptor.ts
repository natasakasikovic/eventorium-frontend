import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken: any = localStorage.getItem('user');
    if (req.headers.get('skip')) return next.handle(req);

    const clonedRequest = accessToken
      ? req.clone({
          headers: req.headers.set('Authorization', "Bearer " + accessToken),
        })
      : req;

    return next.handle(clonedRequest).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401 && errorResponse.error?.error === 'Token expired') {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => errorResponse);
      })
    );
  }
}
