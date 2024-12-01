import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Category} from '../model/category.model';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-category-overview',
  templateUrl: './categories-overview.component.html',
  styleUrl: './categories-overview.component.css'
})
export class CategoriesOverviewComponent implements OnInit {
  categories: Category[];
  showEdit: boolean;
  selectedCategory: Category;

  constructor(
    private categoryService: CategoryService
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

  deleteCategory(id: number): void {
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.getAll();
      },
      error: (e: Error) => {
        console.log(e);
      }
    });
  }

  openEdit(id: number): void {
    this.categoryService.get(id).subscribe({
      next: (category: Category) => {
        this.selectedCategory = category;
        this.showEdit = true;
      },
      error: (_) => {
        console.log("Category not found!");
      }
    });
  }

  closeEdit(): void {
    this.showEdit = false;
    this.getAll();
  }
}
