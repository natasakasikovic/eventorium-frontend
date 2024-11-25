import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Category} from '../model/category.model';
import {CategoryService} from '../category.service';

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
    this.categoryProposals = this.categoryService.getAllProposals();
  }

  acceptCategory(id: number): void {

  }

  declineCategory(id: number): void {

  }

  openUpdateCategory(id: number): void {
    this.selectedCategory = this.categoryService.get(id);
    this.showUpdate = true;
  }
}
