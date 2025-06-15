import {Component, Input} from '@angular/core';
import {BudgetItem} from '../model/budget-item.model';
import {BudgetItemStatus} from '../model/budget-item-status.enum';
import {SolutionType} from '../model/solution-type.enum';
import {BudgetService} from '../budget.service';
import {Product} from '../../product/model/product.model';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrl: './budget-table.component.css'
})
export class BudgetTableComponent {
  @Input() items: BudgetItem[];
  @Input() eventId: number;

  displayedColumns: string[] = ["Name", "Category", "Spent amount", "Planned amount", "Status", "Actions"];

  statusClasses = {
    [BudgetItemStatus.PENDING] : 'status-pending',
    [BudgetItemStatus.PLANNED] : 'status-planned',
    [BudgetItemStatus.PROCESSED] : 'status-processed',
    [BudgetItemStatus.DENIED] : 'status-denied',
    null : 'status-denied',
  }

  constructor(private budgetService: BudgetService) {
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
    return this.statusClasses[status];
  }

  purchaseProduct(item: BudgetItem): void {
    this.budgetService.purchase(this.eventId, {
      category: item.category,
      itemId: item.solutionId,
      itemType: item.type,
      plannedAmount: item.plannedAmount
    }).subscribe({
      next: (product: Product) => {
        const processedItem = this.items.find(bi => bi.solutionId == item.solutionId);
        processedItem.status = BudgetItemStatus.PROCESSED;
        processedItem.spentAmount = product.price * (1 - product.discount / 100);
      }
    });
  }

  protected readonly BudgetItemStatus = BudgetItemStatus;
  protected readonly SolutionType = SolutionType;
}
