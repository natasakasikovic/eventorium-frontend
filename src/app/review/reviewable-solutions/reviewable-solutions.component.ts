import {Component, OnInit} from '@angular/core';
import {BudgetService} from '../../budget/budget.service';
import {ReviewableSolution} from '../model/reviewable-solution.model';

@Component({
  selector: 'app-review-list',
  templateUrl: './reviewable-solutions.component.html',
  styleUrl: './reviewable-solutions.component.css'
})
export class ReviewableSolutionsComponent implements OnInit {
  items: ReviewableSolution[];

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  private loadItems(): void {
    this.budgetService.getBudgetItems().subscribe({
      next: (items: ReviewableSolution[]) => {
        this.items = items;
      }
    });
  }
}
