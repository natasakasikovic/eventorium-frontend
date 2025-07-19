import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ReservationType} from '../model/reservation-type.enum';
import {Router} from '@angular/router';
import {EventTypeService} from '../../event-type/event-type.service';
import {CategoryService} from '../../category/category.service';
import {Category} from '../../category/model/category.model';
import {EventType} from '../../event-type/model/event-type.model';
import {CreateService} from '../model/create-service.model';
import {of, switchMap} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {Status} from '../../category/model/status-enum-ts';
import { minSelectedValidator } from '../../shared/validators/min-selected.validator';
import {categoryValidator} from '../../shared/validators/category.validator';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {
  categories: Category[] = [];
  eventTypes: EventType[] = [];
  createServiceForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    discount: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    description: new FormControl('', Validators.required),
    specialties: new FormControl('', Validators.required),
    eventTypes: new FormControl([], minSelectedValidator(1)),
    type: new FormControl('', Validators.required),
    suggestedCategoryName: new FormControl(),
    suggestedCategoryDescription: new FormControl(),
    category: new FormControl(''),
    isVisible: new FormControl(),
    isAvailable: new FormControl(),
    reservationDeadline: new FormControl('', [Validators.required, Validators.min(1)]),
    cancellationDeadline: new FormControl('', [Validators.required, Validators.min(1)]),
    minDuration: new FormControl(6, Validators.min(1)),
    maxDuration: new FormControl(12, Validators.max(24)),
  }, { validators: categoryValidator() });

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
    if (this.createServiceForm.invalid) return;

    const formValue = this.createServiceForm.value;
    const {
      suggestedCategoryName,
      suggestedCategoryDescription,
      ...request
    } = formValue;

    this.createService({
      ...request,
      category: formValue.category || {
        id: null,
        name: suggestedCategoryName,
        description: suggestedCategoryDescription
      },
    });
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const images = Array.from(input.files);
      const validImages = images.filter(image => image.type.startsWith('image/'));
      if (validImages.length > 0) {
        this.images.push(...validImages);
        this.imagePreviews.push(...validImages.map(image => URL.createObjectURL(image)));
      }
    }
  }

  deleteImage(index: number): void {
    this.images.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  private createService(service: CreateService): void {
    this.serviceService.create(service).pipe(
      switchMap(service => {
        this.toasterService[service.status === Status.ACCEPTED ? 'success' : 'info'](
          `${service.name} has been created successfully!`,
          service.status === Status.ACCEPTED ? "Success" : "Info"
        );
        return this.images.length ? this.serviceService.uploadImages(service.id, this.images) : of(null);
      })
    ).subscribe({
      next: () => void this.router.navigate(["manageable-services"]),
      error: (error: HttpErrorResponse) =>
        this.toasterService.error(error.error.message, "Failed to create service"),
    });
  }

  protected readonly ReservationType = ReservationType;
}
