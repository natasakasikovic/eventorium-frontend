import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Service} from '../../service/model/service.model';
import {ServiceService} from '../../service/service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent implements OnInit, OnDestroy {
  @Input() service: Service;
  @Input() showActions: boolean;
  @Input() reviewable: boolean;

  @Output() delete: EventEmitter<Service> = new EventEmitter();
  @Output() review: EventEmitter<Service> = new EventEmitter();

  constructor(
    private serviceService: ServiceService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.serviceService.getImage(this.service.id).subscribe({
      next: (blob: Blob) => {
        this.service.images = [];
        this.service.images.push(URL.createObjectURL(blob));
      },
      error: (_) => {
        this.service.images = [];
        this.service.images.push("/photo_placeholder.png");
      }
    });
  }

  onDelete(): void {
    this.delete.emit(this.service);
  }

  onReview(): void {
    this.review.emit(this.service);
  }

  ngOnDestroy(): void {
    URL.revokeObjectURL(this.service.images[0]);
  }

}
