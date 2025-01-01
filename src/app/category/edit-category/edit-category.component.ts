import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from '../model/category.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../category.service';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements AfterViewInit {
  @Input() category: Category
  @Output() close: EventEmitter<void> = new EventEmitter();

  editCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(
    private categoryService: CategoryService,
    private toasterService: ToastrService
  ) {}

  ngAfterViewInit(): void {
    this.editCategoryForm.get('name').setValue(this.category.name);
    this.editCategoryForm.get('description').setValue(this.category.description);
  }

  onClose(): void {
    this.close.emit();
  }

  onSave(): void {
    if(this.editCategoryForm.valid) {
      this.categoryService.update(this.category.id, {
        name: this.editCategoryForm.value.name,
        description: this.editCategoryForm.value.description,
      }).subscribe({
        next: () => {
          this.toasterService.success(`${this.category.name} has been updated successfully!`, "Success");
          this.onClose();
        },
        error: (error: HttpErrorResponse) => {
          this.toasterService.error(error.error.message, "Failed to update category");
        }
      });
    }
  }
}
