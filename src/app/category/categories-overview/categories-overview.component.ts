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
    private categoryService: CategoryService,
    private changeDetector: ChangeDetectorRef
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
    this.categoryService.delete(id);
    this.categories = this.categories.filter(category => category.id !== id);
    this.changeDetector.detectChanges();
  }

  openEdit(id: number): void {
    this.selectedCategory = this.categoryService.get(id);
    this.showEdit = true;
  }

  closeEdit(): void {
    this.showEdit = false;
  }
}
