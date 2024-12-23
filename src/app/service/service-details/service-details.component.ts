import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Service} from '../model/service.model';
import {ActivatedRoute, Router} from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id: number = +param['id'];
      this.serviceService.get(id).pipe(
        switchMap((service: Service) =>
          forkJoin([
            this.serviceService.get(id),
            this.serviceService.getImages(service.id)
          ])
        )
      ).subscribe({
        next: ([service, images]: [Service, ImageResponseDto[]]) => {
          this.service = service;
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
}
