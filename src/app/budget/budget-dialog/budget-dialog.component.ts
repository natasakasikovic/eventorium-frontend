import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BudgetItem} from '../model/budget-item.model';

@Component({
  selector: 'app-budget-dialog',
  templateUrl: './budget-dialog.component.html',
  styleUrl: './budget-dialog.component.css'
})
export class BudgetDialogComponent implements OnInit {

  items: BudgetItem[];
  eventId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { budgetItems: BudgetItem[], eventId: number }
  ) {
  }

  ngOnInit(): void {
    this.items = this.data.budgetItems;
    this.eventId = this.data.eventId;
  }
}
