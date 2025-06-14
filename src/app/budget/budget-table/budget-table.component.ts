import {Component, Input, OnInit} from '@angular/core';
import {BudgetItem} from '../model/budget-item.model';
import {BudgetItemStatus} from '../model/budget-item-status.enum';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrl: './budget-table.component.css'
})
export class BudgetTableComponent {
  @Input() items: BudgetItem[];
  displayedColumns: string[] = ["Name", "Category", "Spent amount", "Planned amount", "Status"];

  statusClasses = {
    [BudgetItemStatus.PENDING] : 'status-pending',
    [BudgetItemStatus.PLANNED] : 'status-planned',
    [BudgetItemStatus.PROCESSED] : 'status-processed',
    [BudgetItemStatus.DENIED] : 'status-denied',
    null : 'status-denied',
  }

  getTotalSpent(): number {
    return this.items.reduce((acc, item) => acc + (item.spentAmount || 0), 0);
  }

  getTotalPlanned(): number {
    return this.items.reduce((acc, item) => acc + (item.plannedAmount || 0), 0);
  }

  getStatusLabel(status: BudgetItemStatus): string {
    switch (status) {
      case BudgetItemStatus.PROCESSED: return 'Processed';
      case BudgetItemStatus.DENIED: return 'Denied';
      case BudgetItemStatus.PLANNED: return 'Planned';
      case BudgetItemStatus.PENDING: return 'Pending';
      default: return status;
    }
  }

  getStatusColor(status: BudgetItemStatus): string {
    const color =  this.statusClasses[status];
    console.log(color);
    return color;
  }
}
