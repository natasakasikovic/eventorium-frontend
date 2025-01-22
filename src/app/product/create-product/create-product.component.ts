import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Category } from "../../category/model/category.model";
import { EventType } from "../../event-type/model/event-type.model";


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  productForm: FormGroup;
  categories: Category[] = [];
  eventTypes: EventType[] = [];
  images: File[] = [];
  imagePreviews: string[] = [];

  constructor(
    private fb: FormBuilder
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
    
  }

}
