import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CommentDialogComponent} from '../comment-dialog/comment-dialog.component';
import {CommentService} from '../comment.service';
import {EventService} from '../../event/event.service';
import {ToastrService} from 'ngx-toastr';
import {BudgetService} from '../../budget/budget.service';
import {AuthService} from '../../auth/auth.service';
import {Review} from '../model/review.model';
import {RatingService} from '../rating.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent implements OnInit {
  items: Review[];

  constructor(
    private budgetService: BudgetService,
  ) { }

  ngOnInit(): void {
    this.loadItems();
  }

  private loadItems(): void {
    this.budgetService.getBudgetItems().subscribe({
      next: (items: Review[]) => {
        this.items = items;
      }
    })
  }
}
