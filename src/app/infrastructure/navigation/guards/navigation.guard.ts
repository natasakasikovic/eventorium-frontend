import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class NavigationGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const currentUrl: string = this.router.url;
    const allowedUrls: string[] = route.data['allowedUrls'] || [];

    if (allowedUrls.some(allowedUrl => currentUrl.startsWith(allowedUrl))) {
      return true;
    }

    const fallbackRoute: string = route.data['fallback'] || '/home';
    return this.router.createUrlTree([fallbackRoute]);
  }
}
