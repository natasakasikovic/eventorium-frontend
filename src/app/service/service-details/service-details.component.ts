import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Service} from '../model/service.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceService} from '../service.service';
import {ImageResponseDto} from '../../shared/model/image-response-dto.model';
import {forkJoin, switchMap} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css'
})
export class ServiceDetailsComponent implements OnInit {
  @Input() service: Service
  isFavourite: boolean;

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  get loggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id: number = +param['id'];
      this.serviceService.get(id).pipe(
        switchMap((service: Service) =>{
          if (this.loggedIn) {
            return forkJoin([
              this.serviceService.get(id),
              this.serviceService.getImages(service.id),
              this.serviceService.getIsFavourite(service.id)
            ]);
          } else {
            return forkJoin([
              this.serviceService.get(id),
              this.serviceService.getImages(service.id)
            ]);
          }
        })
      ).subscribe({
        next: ([service, images, isFavourite]: [Service, ImageResponseDto[], boolean?]) => {
          this.service = service;
          if(this.loggedIn) {
            this.isFavourite = isFavourite;
          }
          this.service.images = images.map(image =>
            `data:${image.contentType};base64,${image.data}`
          );
        },
        error: (error) => {
          // TODO: Navigate to error page
          void this.router.navigate(['/home'])
        }
      });
    });
  }

  toggleFavouriteService(): void {
    if(this.isFavourite) {
      this.serviceService.removeFromFavourites(this.service.id).subscribe({
        next: () => {
          this.isFavourite = false;
        }
      });
    } else {
      this.serviceService.addToFavourites(this.service.id).subscribe({
        next: () => {
          this.isFavourite = true;
        }
      });
    }
  }
}
