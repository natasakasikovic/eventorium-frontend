import {Component, Input, OnInit} from '@angular/core';
import {BudgetItem} from '../model/budget-item.model';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrl: './budget-table.component.css'
})
export class BudgetTableComponent {
  @Input() items: BudgetItem[];
  displayedColumns: string[] = ["Name", "Category", "Spent amount", "Planned amount"];

  getTotalSpent(): number {
    return this.items.reduce((acc, item) => acc + (item.spentAmount || 0), 0);
  }

  getTotalPlanned(): number {
    return this.items.reduce((acc, item) => acc + (item.plannedAmount || 0), 0);
  }
}
