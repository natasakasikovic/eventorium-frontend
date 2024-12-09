import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Category} from '../model/category.model';
import {CategoryService} from '../category.service';
import {Status} from '../model/status-enum-ts';

@Component({
  selector: 'app-category-proposals',
  templateUrl: './category-proposals.component.html',
  styleUrl: './category-proposals.component.css'
})
export class CategoryProposalsComponent implements OnInit {
  categoryProposals: Category[];
  selectedCategory: Category;
  showUpdate: boolean;

  constructor(
    private categoryService: CategoryService,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.categoryService.getAllProposals().subscribe({
      next: (categories: Category[]) => {
        this.categoryProposals = categories;
      }
    });
  }

  acceptCategory(id: number): void {
    this.categoryService.updateCategoryStatus(id, Status.ACCEPTED).subscribe({
      next: ((category: Category) => {
        console.log(`Successfully updated ${category}!`);
      }),
      error: (err: Error) => {
        console.error(err);
      }
    });
  }

  declineCategory(id: number): void {
    this.categoryService.updateCategoryStatus(id, Status.DECLINED);
  }

  openUpdateCategory(id: number): void {
    this.categoryService.get(id).subscribe({
      next: (category: Category) => {
        this.selectedCategory = category;
        this.showUpdate = true;
      }
    });
  }
}
