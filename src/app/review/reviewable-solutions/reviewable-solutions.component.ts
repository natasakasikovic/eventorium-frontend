import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {BudgetService} from '../../budget/budget.service';
import {Review} from '../model/review.model';

@Component({
  selector: 'app-review-list',
  templateUrl: './reviewable-solutions.component.html',
  styleUrl: './reviewable-solutions.component.css'
})
export class ReviewableSolutionsComponent implements OnInit {
  items: Review[];

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  private loadItems(): void {
    this.budgetService.getBudgetItems().subscribe({
      next: (items: Review[]) => {
        this.items = items;
      }
    });
  }
}
