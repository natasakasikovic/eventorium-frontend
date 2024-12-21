import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Service} from '../model/service.model';
import {ActivatedRoute} from '@angular/router';
import {ServiceService} from '../service.service';
import {ImageResponseDto} from '../../shared/model/image-response-dto.model';
import {forkJoin, switchMap} from 'rxjs';

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
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id: number = +param['id'];
      this.serviceService.get(id).pipe(
        switchMap((service: Service) =>
          forkJoin([
            this.serviceService.get(id),
            this.serviceService.getImages(service.id),
            this.serviceService.getIsFavourite(service.id)
          ])
        )
      ).subscribe({
        next: ([service, images, isFavourite]: [Service, ImageResponseDto[], boolean]) => {
          this.service = service;
          this.isFavourite = isFavourite;
          this.service.images = images.map(image =>
            `data:${image.contentType};base64,${image.data}`
          );
        },
        error: (error) => {
          console.error('Error loading service or images:', error);
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
