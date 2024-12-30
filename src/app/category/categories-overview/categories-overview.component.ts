import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Category} from '../model/category.model';
import {CategoryService} from '../category.service';
import {LoginComponent} from '../../auth/login/login.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteConfirmationComponent} from '../../shared/delete-confirmation/delete-confirmation.component';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-category-overview',
  templateUrl: './categories-overview.component.html',
  styleUrl: './categories-overview.component.css'
})
export class CategoriesOverviewComponent implements OnInit {
  categories: Category[] = [];
  showEdit: boolean;
  selectedCategory: Category;

  constructor(
    private categoryService: CategoryService,
    private toasterService: ToastrService,
    private dialog: MatDialog,
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
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
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

  openEdit(id: number): void {
    this.categoryService.get(id).subscribe({
      next: (category: Category) => {
        this.selectedCategory = category;
        this.showEdit = true;
      },
      error: (error: HttpErrorResponse) => {
        this.toasterService.error(
          error.error.message || 'An unexpected error occurred while opening the category editor.',
          "Edit Category Failed"
        );
      }
    });
  }

  closeEdit(): void {
    this.showEdit = false;
    this.getAll();
  }
}
