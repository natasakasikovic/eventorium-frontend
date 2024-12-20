import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Service} from '../model/service.model';
import {ActivatedRoute} from '@angular/router';
import {ServiceService} from '../service.service';
import {ImageResponseDto} from '../../shared/model/image-response-dto.model';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css'
})
export class ServiceDetailsComponent implements OnInit, OnDestroy {
  @Input() service: Service
  isFavorite: boolean;

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id: number = +param['id'];
      this.serviceService.get(id).subscribe({
        next: (service: Service) => {
          this.service = service;
          this.serviceService.getImages(service.id).subscribe({
            next: (images: ImageResponseDto[]) => {
              this.service.images = images.map(image =>
                `data:${image.contentType};base64,${image.data}`
              );
            }
          });
          this.loadIsFavourite()
        }
      });
    });
  }

  loadIsFavourite(): void {
    this.serviceService.getIsFavourite(this.service.id).subscribe({
      next: (isFavourite: boolean) => {
        this.isFavorite = isFavourite;
      }
    })
  }

  ngOnDestroy(): void {
    this.service.images.forEach(image => URL.revokeObjectURL(image));
  }

  toggleFavouriteService(): void {
    if(this.isFavorite) {
      this.serviceService.removeFromFavourites(this.service.id).subscribe({
        next: () => {
          this.isFavorite = false;
        }
      });
    } else {
      this.serviceService.addToFavourites(this.service.id).subscribe({
        next: () => {
          this.isFavorite = true;
        }
      });
    }
  }
}
