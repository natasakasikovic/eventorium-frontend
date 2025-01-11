import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Category} from '../model/category.model';
import {CategoryService} from '../category.service';
import {LoginComponent} from '../../auth/login/login.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteConfirmationComponent} from '../../shared/delete-confirmation/delete-confirmation.component';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {EditCategoryComponent} from '../edit-category/edit-category.component';

@Component({
  selector: 'app-category-overview',
  templateUrl: './categories-overview.component.html',
  styleUrl: './categories-overview.component.css'
})
export class CategoriesOverviewComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private toasterService: ToastrService,
    private deleteConfirmationDialog: MatDialog,
    private editDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.categoryService.getAll().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
     }
    });
  }

  private deleteCategory(category: Category): void {
    this.categoryService.delete(category.id).subscribe({
      next: () => {
        this.categories = this.categories.filter(c => c.id !== category.id);
        this.toasterService.success(`${category.name} has been deleted successfully!`, "Success");
      },
      error: (error: HttpErrorResponse) => {
        this.toasterService.error(error.error.message, "Failed to delete category");
      }
    });
  }

  openDeleteConfirmation(category: Category): void {
    const dialogRef = this.deleteConfirmationDialog.open(DeleteConfirmationComponent, {
      width: '450px',
      height: 'auto',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: {
        name: category.name
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteCategory(category);
      }
      dialogRef.close();
    });
  }

  openEdit(category: Category): void {
    const dialogRef = this.editDialog.open(EditCategoryComponent, {
      width: '450px',
      height: 'auto',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: {
        category: category
      }
    });

    dialogRef.afterClosed().subscribe((category: Category) => {
      const index = this.categories.findIndex(existingCategory => existingCategory.id === category.id);
      this.categories[index] = category;
      dialogRef.close();
    });
  }

}
