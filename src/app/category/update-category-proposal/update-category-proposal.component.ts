import {AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Category} from '../model/category.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../category.service';
import {CategoryRequestDto} from '../model/category-request-dto.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-update-category-proposal',
  templateUrl: './update-category-proposal.component.html',
  styleUrl: './update-category-proposal.component.css'
})
export class UpdateCategoryProposalComponent implements OnInit, AfterViewInit {
  categories: Category[]

  updateProposalForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl(''),
  });

  constructor(
    private categoryService: CategoryService,
    private toasterService: ToastrService,
    private dialogRef: MatDialogRef<UpdateCategoryProposalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: Category }
  ) {
  }

  ngAfterViewInit(): void {
    this.updateProposalForm.get('name').setValue(this.data.category.name);
    this.updateProposalForm.get('description').setValue(this.data.category.description);
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (categories: Category[]) => {
        this.categories = [...categories];
      }
    })
  }

  onClose(id?: number): void {
    this.dialogRef.close(id);
  }

  onSave(): void {
    if(this.updateProposalForm.value.category === '') {
      this.updateCategory();
    } else {
      this.changeCategory();
    }
  }

  private updateCategory(): void {
    let category: CategoryRequestDto = {
      name: this.updateProposalForm.value.name,
      description: this.updateProposalForm.value.description
    }
    this.data.category.name = category.name;
    this.data.category.description = category.description;
    this.categoryService.updateCategoryProposal(this.data.category.id, category).subscribe({
      next: (category: Category) => {
        this.toasterService.success(`Category ${category.name} has been updated successfully!`, "Success");
        this.onClose(this.data.category.id);
      },
      error: (error: HttpErrorResponse) => {
        this.toasterService.error(error.error.message, "Failed to update category");
      }
    });
  }

  private changeCategory(): void {
    this.categoryService.changeCategoryProposal(this.data.category.id, this.updateProposalForm.value.category).subscribe({
      next: (category: Category) => {
        this.toasterService.success(`Category ${category.name} has been updated successfully!`, "Success");
        this.onClose(this.data.category.id);
      },
      error: (error: HttpErrorResponse) => {
        this.toasterService.error(error.error.message, "Failed to update category");
      }
    });
  }
}
