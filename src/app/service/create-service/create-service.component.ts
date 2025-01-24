import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../service.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReservationType} from '../model/reservation-type.enum';
import {Router} from '@angular/router';
import {EventTypeService} from '../../event-type/event-type.service';
import {CategoryService} from '../../category/category.service';
import {Category} from '../../category/model/category.model';
import {EventType} from '../../event-type/model/event-type.model';
import {CreateServiceRequestDto} from '../model/create-service-dto.model';
import {of, switchMap} from 'rxjs';
import {Service} from '../model/service.model';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {Status} from '../../category/model/status-enum-ts';
import { minSelectedValidator } from '../../shared/validators/min-selected.validator';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {
  categories: Category[] = []
  eventTypes: EventType[] = [];
  createServiceForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    discount: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    description: new FormControl('', Validators.required),
    specialties: new FormControl('', Validators.required),
    eventTypes: new FormControl([], minSelectedValidator(1)),
    reservationType: new FormControl('', Validators.required),
    suggestedCategoryName: new FormControl(),
    suggestedCategoryDescription: new FormControl(),
    category: new FormControl(''),
    visible: new FormControl(),
    available: new FormControl(),
    reservationDeadline: new FormControl('', [Validators.required, Validators.min(1)]),
    cancellationDeadline: new FormControl('', [Validators.required, Validators.min(1)]),
    minDuration: new FormControl(6),
    maxDuration: new FormControl(12),
  });

  images: File[] = []
  imagePreviews: string[] = []

  constructor(
    private serviceService: ServiceService,
    private eventTypeService: EventTypeService,
    private categoryService: CategoryService,
    private router: Router,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (categories: Category[]) => {
        this.categories.push(...categories);
      },
      error: (err: Error) => {
        this.toasterService.error("Error loading categories");
      }
    });

    this.eventTypeService.getAll().subscribe({
      next: (eventTypes: EventType[]) => {
        this.eventTypes.push(...eventTypes);
      },
      error: () => {
        this.toasterService.error("Error loading event types");
      }
    });

  }

  onCreate(): void {
    if(this.createServiceForm.valid) {
      const formValue = this.createServiceForm.value;
      const newService: CreateServiceRequestDto = {
        cancellationDeadline: formValue.cancellationDeadline,
        category: formValue.category === ''
          ? { id: null, name: formValue.suggestedCategoryName, description: formValue.suggestedCategoryDescription }
          : formValue.category,
        description: formValue.description,
        discount: formValue.discount,
        eventTypes: formValue.eventTypes,
        maxDuration: formValue.maxDuration,
        minDuration: formValue.minDuration,
        name: formValue.name,
        price: formValue.price,
        reservationDeadline: formValue.reservationDeadline,
        specialties: formValue.specialties,
        type: formValue.reservationType
      }
      this.serviceService.create(newService).pipe(
        switchMap((service: Service) => {
          const serviceId = service.id;
          if(service.status === Status.ACCEPTED) {
            this.toasterService.success(`${service.name} has been created successfully!`, "Success");
          } else {
            this.toasterService.info("The service is currently in a pending state. Please wait while we process your request.", "Info");
          }
          if(this.images.length !== 0) {
            return this.serviceService.uploadFiles(serviceId, this.images);
          }
          return of(null);
        })
      ).subscribe({
        next: () => {
          void this.router.navigate(["manageable-services"]);
        },
        error: (error: HttpErrorResponse) => {
          this.toasterService.error(error.error.message, "Failed to create service")
        }
      });
    }
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const images = Array.from(input.files);
      const validImages = images.filter(image => image.type.startsWith('image/'));
      if (validImages.length > 0) {
        this.images = validImages;
        this.imagePreviews = validImages.map(image => URL.createObjectURL(image));
      }
    }
  }

  protected readonly ReservationType = ReservationType;
}
