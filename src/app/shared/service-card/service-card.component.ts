import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Service} from '../../service/model/service.model';
import {ServiceService} from '../../service/service.service';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent implements OnInit, OnDestroy {
  @Input() service: Service;
  @Input() showActions: boolean;

  @Output() delete: EventEmitter<Service> = new EventEmitter();

  constructor(
    private serviceService: ServiceService
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

  ngOnDestroy(): void {
    URL.revokeObjectURL(this.service.images[0]);
  }
}
