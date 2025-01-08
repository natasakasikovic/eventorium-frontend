import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductFilter } from '../model/product-filter.model';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { EventType } from '../../event-type/model/event-type.model';
import { Category } from '../../category/model/category.model';
import { EventTypeService } from '../../event-type/event-type.service';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'app-products-filter-dialog',
  templateUrl: './products-filter-dialog.component.html',
  styleUrl: './products-filter-dialog.component.css'
})
export class ProductsFilterDialogComponent implements OnInit {

  filterForm: FormGroup;
  eventTypes: EventType[];
  categories: Category[];

  constructor( public dialogRef: MatDialogRef<ProductsFilterDialogComponent>,
    private eventTypeService: EventTypeService,
    private categoryService: CategoryService,
    private fb: FormBuilder) {

      this.filterForm = this.fb.group({
        name: [''],
        description: [''],
        eventType: [''],
        category: [''],
        minPrice: ['', [Validators.min(0)]], 
        maxPrice: ['', [this.greaterThanZero()]],
        availability: ['']
  }) }
  
  greaterThanZero(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value > 0 ? null : { greaterThanZero: true };
    };
  }

  ngOnInit(): void {
    this.getAllEventTypes();
    this.getAllCategories();
  }

  getAllEventTypes(): void {
    this.eventTypeService.getAll().subscribe({
      next: (eventTypes: EventType[]) => (this.eventTypes = eventTypes)
    });
  }

  getAllCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (categories: Category[]) => this.categories = categories
    });
  }

  applyFilters() {
    if (this.filterForm.valid){
      const filter = this.getFormValues()
      this.dialogRef.close(filter)
    }
  }

  getFormValues() : ProductFilter {
    let formValues = this.filterForm.value;
    return {
      name: formValues.name,
      description: formValues.description,
      type: formValues.eventType.name === "all" ? null : formValues.eventType.name,
      category: formValues.category.name,
      availability : formValues.availability,
      minPrice: formValues.minPrice,
      maxPrice: formValues.maxPrice,
      }
    }
}