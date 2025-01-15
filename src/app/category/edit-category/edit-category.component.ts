import {AfterViewInit, Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {Category} from '../model/category.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../category.service';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements AfterViewInit {

  editCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(
    private categoryService: CategoryService,
    private toasterService: ToastrService,
    private dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: Category }
  ) {}

  ngAfterViewInit(): void {
    this.editCategoryForm.get('name').setValue(this.data.category.name);
    this.editCategoryForm.get('description').setValue(this.data.category.description);
  }

  onClose(): void {
    this.dialogRef.close(this.data.category);
  }

  onSave(): void {
    if(this.editCategoryForm.valid) {
      this.data.category.name = this.editCategoryForm.value.name;
      this.data.category.description = this.editCategoryForm.value.description;
      this.categoryService.update(this.data.category.id, {
        name: this.editCategoryForm.value.name,
        description: this.editCategoryForm.value.description,
      }).subscribe({
        next: () => {
          this.toasterService.success(`${this.data.category.name} has been updated successfully!`, "Success");
          this.onClose();
        },
        error: (error: HttpErrorResponse) => {
          this.toasterService.error(error.error.message, "Failed to update category");
        }
      });
    }
  }
}
