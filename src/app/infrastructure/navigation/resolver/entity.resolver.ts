import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Injectable, Injector} from '@angular/core';
import {OwnableEntity} from '../../../shared/model/ownable-entity.model';
import {map, Observable, tap} from 'rxjs';
import {ServiceService} from '../../../service/service.service';
import {ProductService} from '../../../product/product.service';
import {EventService} from '../../../event/event.service';
import {AuthService} from '../../../auth/auth.service';


@Injectable({ providedIn: 'root' })
export class EntityResolver<T extends OwnableEntity> implements Resolve<T> {
  constructor(
    private injector: Injector,
    private router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<T> {
    const id = route.params['id'];
    const type = route.data['entityType'] as 'service' | 'product' | 'event';

    let obs: Observable<OwnableEntity>;

    switch (type) {
      case 'service':
        obs = this.injector.get(ServiceService).get(id);
        break;
      case 'product':
        obs = this.injector.get(ProductService).get(id);
        break;
      case 'event':
        obs = this.injector.get(EventService).getEventDetails(id);
        break;
      default:
        throw new Error('Unsupported entity type');
    }

    const currentUserId = this.injector.get(AuthService).getUserId();
    return obs.pipe(
      tap(entity => {
        const ownerId = entity.provider?.id ?? entity.organizer?.id;
        if (ownerId !== currentUserId) {
          void this.router.navigate(['/error'], {
            queryParams: {
              code: 403,
              message: `You are not authorized to change this ${type}.`
            }
          });
          throw new Error('Not authorized');
        }
      }),
      map(entity => entity as T)
    );
  }
}
