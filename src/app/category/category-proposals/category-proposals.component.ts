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
  categoryProposals: Category[] = [];
  selectedCategory: Category;
  showUpdate: boolean;

  constructor(
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.categoryService.getAllProposals().subscribe({
      next: (categories: Category[]) => {
        this.categoryProposals.push(...categories);
      }
    });
  }

  updateCategoryStatus(id: number, status: Status): void {
    this.categoryService.updateCategoryStatus(id, status).subscribe({
      next: ((category: Category) => {
        this.categoryProposals = this.categoryProposals.filter(proposal => proposal.id !== category.id);
      }),
      error: (err: Error) => {
        console.error(err);
      }
    });
  }

  openUpdateCategory(id: number): void {
    this.categoryService.get(id).subscribe({
      next: (category: Category) => {
        this.selectedCategory = category;
        this.showUpdate = true;
      }
    });
  }

  onClose(): void {
    this.showUpdate = false;
    this.categoryProposals = this.categoryProposals.filter(proposal => proposal.id !== this.selectedCategory.id);
  }

  protected readonly Status = Status;
}
