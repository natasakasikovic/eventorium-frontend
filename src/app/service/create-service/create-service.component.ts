import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../service.service';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ReservationType} from '../model/reservation-type.enum';
import {Router} from '@angular/router';
import {EventTypeService} from '../../event-type/event-type.service';
import {CategoryService} from '../../category/category.service';
import {Category} from '../../category/model/category.model';
import {EventType} from '../../event-type/model/event-type.model';
import {CreateServiceRequestDto} from '../model/create-service-dto.model';
import {of, switchMap} from 'rxjs';
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
  categories: Category[] = [];
  eventTypes: EventType[] = [];
  images: File[] = [];
  imagePreviews: string[] = [];

  createServiceForm: FormGroup;

  constructor(
    private serviceService: ServiceService,
    private eventTypeService: EventTypeService,
    private categoryService: CategoryService,
    private router: Router,
    private toasterService: ToastrService
  ) {
    this.createServiceForm = this.initForm();
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (categories) => (this.categories = categories),
      error: () => this.toasterService.error("Error loading categories"),
    });

    this.eventTypeService.getAll().subscribe({
      next: (eventTypes) => (this.eventTypes = eventTypes),
      error: () => this.toasterService.error("Error loading event types"),
    });
  }

  private initForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      discount: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
      description: new FormControl('', Validators.required),
      specialties: new FormControl('', Validators.required),
      eventTypes: new FormControl([], minSelectedValidator(1)),
      type: new FormControl('', Validators.required),
      suggestedCategoryName: new FormControl(),
      suggestedCategoryDescription: new FormControl(),
      category: new FormControl(null),
      visible: new FormControl(false),
      available: new FormControl(false),
      reservationDeadline: new FormControl('', [Validators.required, Validators.min(1)]),
      cancellationDeadline: new FormControl('', [Validators.required, Validators.min(1)]),
      minDuration: new FormControl(6),
      maxDuration: new FormControl(12),
    }, { validators: this.categoryValidator() });
  }

  onCreate(): void {
    if (this.createServiceForm.invalid) return;

    const formValue = this.createServiceForm.value;
    this.createService({
      ...formValue,
      category: formValue.category || {
        id: null,
        name: formValue.suggestedCategoryName,
        description: formValue.suggestedCategoryDescription,
      },
      isAvailable: formValue.available ?? false,
      isVisible: formValue.visible ?? false,
    });
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.images = Array.from(input.files).filter(file => file.type.startsWith('image/'));
    this.imagePreviews = this.images.map(file => URL.createObjectURL(file));
  }

  private createService(service: CreateServiceRequestDto): void {
    this.serviceService.create(service).pipe(
      switchMap(service => {
        this.toasterService[service.status === Status.ACCEPTED ? 'success' : 'info'](
          `${service.name} has been created successfully!`,
          service.status === Status.ACCEPTED ? "Success" : "Info"
        );
        return this.images.length ? this.serviceService.uploadFiles(service.id, this.images) : of(null);
      })
    ).subscribe({
      next: () => void this.router.navigate(["manageable-services"]),
      error: (error: HttpErrorResponse) =>
        this.toasterService.error(error.error.message, "Failed to create service"),
    });
  }

  private categoryValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const form = control as FormGroup;
      const category = form.get('category')?.value;
      const suggestedName = form.get('suggestedCategoryName')?.value;
      const suggestedDescription = form.get('suggestedCategoryDescription')?.value;

      if (!category) {
        const errors: ValidationErrors = {};

        if (!suggestedName || suggestedName.trim() === '') {
          errors['suggestedCategoryNameRequired'] = true;
        }

        if (!suggestedDescription || suggestedDescription.trim() === '') {
          errors['suggestedCategoryDescriptionRequired'] = true;
        }

        return Object.keys(errors).length ? errors : null;
      }

      return null;
    };
  }
  protected readonly ReservationType = ReservationType;
}
