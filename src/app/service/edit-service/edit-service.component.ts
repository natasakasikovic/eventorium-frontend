import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Service} from '../model/service.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceService} from '../service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ReservationType} from '../model/reservation-type.enum';
import {EventTypeService} from '../../event-type/event-type.service';
import {EventType} from '../../event-type/model/event-type.model';
import {switchMap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {RemoveImageRequest} from '../../shared/model/remove-image-request.model';
import {ERROR_MESSAGES} from '../../shared/constants/error-messages';
import {ImageResponseDto} from '../../shared/model/image-response-dto.model';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
})
export class EditServiceComponent implements OnInit, OnDestroy {
  @Input() service: Service
  eventTypes: EventType[] = [];

  editServiceForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required),
    discount: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    specialties: new FormControl("", Validators.required),
    type: new FormControl(ReservationType.MANUAL, Validators.required),
    visible: new FormControl("", Validators.required),
    available: new FormControl("", Validators.required),
    reservationDeadline: new FormControl("", [Validators.required, Validators.min(1)]),
    cancellationDeadline: new FormControl("", [Validators.required, Validators.min(1)]),
    minDuration: new FormControl("", Validators.required),
    maxDuration: new FormControl("", Validators.required),
    eventTypesIds: new FormControl("", Validators.required)
  });

  existingImages: number[] = [];
  existingImagesPreview: string[] = [];
  removedImages: RemoveImageRequest[] = [];
  newImages: File[] = [];
  newImagesPreview: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private eventTypeService: EventTypeService,
    private toasterService: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id: number = +param['id'];

      this.eventTypeService.getAll().pipe(
        switchMap((eventTypes: EventType[]) => {
          this.eventTypes = eventTypes;
          return this.serviceService.get(id);
        }),
        switchMap((service: Service) => {
          this.service = service;
          return this.serviceService.getImages(service.id);
        })
      ).subscribe({
        next: (images: ImageResponseDto[]) => {
          this.existingImagesPreview = images.map(image =>
            `data:${image.contentType};base64,${image.data}`
          );
          this.existingImages = images.map(image => image.id);
          this.loadForm();
        },
        error: (error: HttpErrorResponse) => {
          void this.router.navigate(['/error'], {
            queryParams: {
              code: error.status,
              message: error.error?.message || 'An unknown error occurred.'
            }
          });
        }
      });
    });
  }

  onUpdate(): void {
    if(!this.editServiceForm.invalid) {
      const formValue = this.editServiceForm.value;
      this.serviceService.update(this.service.id, formValue).subscribe({
        next: (service: Service) => {
          this.toasterService.success(`Successfully updated service "${service.name}"!`, "Success");
          this.removeImages();
          if(this.newImages.length == 0)
            void this.router.navigate(['manageable-services']);
          else
            this.uploadNewImages();
        },
        error: (error: HttpErrorResponse) => {
          this.toasterService.error(error.error.message, "Error updating service");
        }
      });
    }
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const images = Array.from(input.files);
      const validImages = images.filter(image => image.type.startsWith('image/'));
      if (validImages.length > 0) {
        this.newImagesPreview.push(...validImages.map(image => URL.createObjectURL(image)));
        this.newImages = validImages;
      }
    }
  }

  removeExistingImage(index: number): void {
    this.existingImagesPreview.splice(index, 1);
    const removed = this.existingImages.splice(index, 1);
    const request: RemoveImageRequest = {
      id: removed[0]
    }
    this.removedImages.push(request);
  }

  removeNewImage(index: number): void {
    this.newImages.splice(index, 1);
    this.newImagesPreview.splice(index, 1);
  }

  private loadForm(): void {
    this.editServiceForm.patchValue({
      ...this.service,
      eventTypesIds: this.service.eventTypes.map(eventType => eventType.id)
    });
  }

  private uploadNewImages(): void {
    this.serviceService.uploadImages(this.service.id, this.newImages).subscribe({
      next: (_) => {
        void this.router.navigate(['manageable-services']);
      },
      error: (_) => {
        this.toasterService.error(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.IMAGE_UPLOAD_ERROR);
      }
    });
  }

  private removeImages(): void {
    if (this.removedImages.length == 0) return;
    this.serviceService.removeImages(this.service.id, this.removedImages).subscribe();
  }

  ngOnDestroy(): void {
    this.newImagesPreview.forEach(url => {
      URL.revokeObjectURL(url);
    });
  }

  protected readonly ReservationType = ReservationType;
}
