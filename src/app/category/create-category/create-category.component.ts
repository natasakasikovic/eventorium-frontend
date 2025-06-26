import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../category.service';
import {Router} from '@angular/router';
import {Category} from '../model/category.model';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {
  createCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(
    private categoryService: CategoryService,
    private toasterService: ToastrService,
    private router: Router
  ) {}


  onCreate(): void {
    this.categoryService.create({
      name: this.createCategoryForm.value.name,
      description: this.createCategoryForm.value.description,
    }).subscribe({
      next: (category: Category) => {
        this.toasterService.success(`${category.name} has been created successfully!`, "Success");
        void this.router.navigate(['categories-overview']);
      },
      error: (error: HttpErrorResponse) => {
        this.toasterService.error(error.error.message, "Failed to create category");
      }
    });
  }

}
