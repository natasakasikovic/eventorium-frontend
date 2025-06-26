import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventType } from '../../event-type/model/event-type.model';
import { EventTypeService } from '../../event-type/event-type.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { minSelectedValidator } from '../../shared/validators/min-selected.validator';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { RemoveImageRequest } from '../../shared/model/remove-image-request.model';
import { switchMap } from 'rxjs';
import { Product } from '../model/product.model';
import { ImageResponseDto } from '../../shared/model/image-response-dto.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit, OnDestroy {
  product: Product;
  productForm: FormGroup;
  eventTypes: EventType[] = [];
  
  existingImages: number[] = [];
  existingImagesPreview: string[] = [];
  removedImages: RemoveImageRequest[] = [];
  newImages: File[] = [];
  newImagesPreview: string[] = [];

  constructor(
    private fb: FormBuilder,
    private eventTypeService: EventTypeService,
    private dialog: MatDialog,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: ToastrService
  ) {
      this.productForm = this.fb.group({
        name: ['', Validators.required],
        price: [null, [Validators.required, Validators.min(1)]],
        discount: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
        description: ['', Validators.required],
        eventTypes: [[], minSelectedValidator(1)],
        visible: [Validators.required],
        available: [Validators.required],
        eventTypesIds: [Validators.required]
      });
    }
    
  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id: number = +param['id'];

      this.eventTypeService.getAll().pipe(
        switchMap((eventTypes: EventType[]) => {
          this.eventTypes = eventTypes;
          return this.productService.get(id);
        }),
        switchMap((product: Product) => {
          this.product = product;
          return this.productService.getImages(product.id);
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

  private loadForm() : void {
    this.productForm.patchValue({
      ...this.product,
      eventTypesIds: this.product.eventTypes.map(eventType => eventType.id)
    })
  }

  getEventTypes() {
    this.eventTypeService.getAll().subscribe({
      next: (eventTypes: EventType[]) => {
        this.eventTypes.push(...eventTypes);
      },
      error: (_) => {
        this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.EVENT_TYPES_LOADING_ERROR);
      }
    });
  }

  private uploadNewImages(): void {
    this.productService.uploadImages(this.product.id, this.newImages).subscribe({
      next: (_) => void this.router.navigate(['manageable-products']),
      error: (error: HttpErrorResponse) => this.handleError(error)
    });
  }

  private removeImages(): void {
    if (this.removedImages.length == 0) return;
    this.productService.removeImages(this.product.id, this.removedImages).subscribe();
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        message: message
      }
    })
  }

  ngOnDestroy(): void {
    this.newImagesPreview.forEach(url => {
      URL.revokeObjectURL(url);
    });
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


  onSubmit(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      this.productService.update(this.product.id, formValue).subscribe({
        next: (product: Product) => {
          this.toasterService.success(`Successfully updated product "${product.name}"!`, "Success");
          this.removeImages();
          if(this.newImages.length == 0)
            void this.router.navigate(['manageable-products']);
          else
            this.uploadNewImages();
        },
        error: (err: HttpErrorResponse) => this.handleError(err)
      })
    }
  }

  handleError(error: HttpErrorResponse): void {
    if (error.status < 500)
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, error.error.message)
    else
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR , ERROR_MESSAGES.SERVER_ERROR)      
  }

}
