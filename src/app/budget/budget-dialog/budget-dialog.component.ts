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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { budgetItems: BudgetItem[] }
  ) {
  }

  ngOnInit(): void {
    this.items = this.data.budgetItems;
  }
}
