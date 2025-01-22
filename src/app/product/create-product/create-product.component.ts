import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../category/model/category.model';
import { CategoryService } from '../../category/category.service';
import { EventTypeService } from '../../event-type/event-type.service';
import { EventType } from '../../event-type/model/event-type.model';
import { CreateProduct } from '../model/create-product.model';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  categories: Category[] = [];
  eventTypes: EventType[] = [];
  images: File[] = [];
  imagePreviews: string[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private eventTypeService: EventTypeService,
    private dialog: MatDialog,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      discount: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      description: ['', Validators.required],
      eventTypes: ['', Validators.minLength(1)],
      suggestedCategoryName: [''],
      suggestedCategoryDescription: [''],
      category: [''],
      isVisible: [false],
      isAvailable: [false]
    });
  }

  ngOnInit(): void {
      this.getCategories();
      this.getEventTypes();
  }

  getCategories() {
    this.categoryService.getAll().subscribe({
      next: (categories: Category[]) => {
        this.categories.push(...categories);
      },
      error: (_) => {
        this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.CATEGORIES_LOADING_ERROR);
      }
    });
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

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const images = Array.from(input.files);
      const validImages = images.filter(image => image.type.startsWith('image/'));
      if (validImages.length > 0) {
        this.images = validImages;
        this.imagePreviews.push(...validImages.map(image => URL.createObjectURL(image)));
      }
    }
  }

  deleteImage(index: number): void {
    this.images.splice(index, 1);
    this.imagePreviews.splice(index, 1); 
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product : CreateProduct = this.productForm.value;
      const category = this.getFormValue('category');
      if (!category) {
        const suggested: Category = {
          id: null,
          name: this.getFormValue('suggestedCategoryName'),
          description: this.getFormValue('suggestedCategoryDescription')
        }
        product.category = suggested;
      }
      this.productService.create(product).subscribe({
        next: (_) => {
          console.log("success")
        }, error: (error) => {
          console.log(error);
        }
      })
    }
  }

  private getFormValue(name: string) {
    return this.productForm.get(name).value;
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        message: message
      }
    })
  }

  ngOnDestroy() {
    this.imagePreviews.forEach(url => {
      URL.revokeObjectURL(url);
    });
  }
}
