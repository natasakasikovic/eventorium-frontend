import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BudgetItem} from '../model/budget-item.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-budget-dialog',
  templateUrl: './budget-dialog.component.html',
  styleUrl: './budget-dialog.component.css'
})
export class BudgetDialogComponent implements OnInit {
  items: BudgetItem[];
  eventId: number;

  constructor(
    private dialogRef: MatDialogRef<BudgetDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { budgetItems: BudgetItem[], eventId: number }
  ) {
  }

  ngOnInit(): void {
    this.items = this.data.budgetItems;
    this.eventId = this.data.eventId;
  }

  navigateToPlanner(): void {
    void this.router.navigate(['budget-planning', this.eventId], {
      queryParams: {
        disableAdvance: true
      }
    });
    this.dialogRef.close();
  }

  onDelete(id: number) {
    this.items = this.items.filter(i => i.id !== id);
  }
}
