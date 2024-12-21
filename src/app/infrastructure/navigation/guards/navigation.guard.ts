import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';
import {NavigationService} from '../navigation.service';


@Injectable({
  providedIn: 'root',
})
export class NavigationGuard implements CanActivate {
  constructor(
    private routeTracker: NavigationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const currentUrl: string = this.routeTracker.getCurrentUrl();
    const allowedUrls: string[] = route.data['allowedUrls'] || [];

    if (allowedUrls.includes(currentUrl)) {
      return true;
    }

    const fallbackRoute: string = route.data['fallback'] || '/home';
    return this.router.createUrlTree([fallbackRoute]);
  }
}
