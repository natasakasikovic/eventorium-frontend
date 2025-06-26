import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { EventService } from '../../event/event.service';

@Injectable({
  providedIn: 'root',
})

export class QuickRegistrationGuard implements CanActivate {
  constructor(
    private router: Router,
    private service: EventService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const hash = route.paramMap.get('hash')

    return this.service.verifyInvitation(hash).pipe(
      map(() => true),
      catchError(() => {
        void this.router.navigate(['/']);
        return of(false);
      })
    );

  }
}
