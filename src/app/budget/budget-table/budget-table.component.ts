import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BudgetItem} from '../model/budget-item.model';
import {BudgetItemStatus} from '../model/budget-item-status.enum';
import {SolutionType} from '../model/solution-type.enum';
import {BudgetService} from '../budget.service';
import {Product} from '../../product/model/product.model';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {
  ServiceReservationDialogComponent
} from '../../service/service-reservation-dialog/service-reservation-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EventSelectionComponent} from '../../shared/event-selection/event-selection.component';
import {Event} from '../../event/model/event.model';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrl: './budget-table.component.css'
})
export class BudgetTableComponent {
  @Input() items: BudgetItem[];
  @Input() eventId: number;

  displayedColumns: string[] = ["Name", "Category", "Spent amount", "Planned amount", "Status", "Actions"];
  @Output() navigateToPlanner: EventEmitter<void> = new EventEmitter();

  statusClasses = {
    [BudgetItemStatus.PENDING] : 'status-pending',
    [BudgetItemStatus.PLANNED] : 'status-planned',
    [BudgetItemStatus.PROCESSED] : 'status-processed',
    [BudgetItemStatus.DENIED] : 'status-denied',
    null : 'status-denied',
  }

  constructor(
    private budgetService: BudgetService,
    private toasterService: ToastrService,
    private dialog: MatDialog,
    private currentRoute: ActivatedRoute
  ) {}

  get route(): string {
    return this.currentRoute.snapshot.url.join('/');
  }

  getTotalSpent(): number {
    return this.items.reduce((acc, item) => acc + (item.spentAmount || 0), 0);
  }

  getTotalPlanned(): number {
    return this.items.reduce((acc, item) => acc + (item.plannedAmount || 0), 0);
  }

  planBudget(): void {
    this.navigateToPlanner.emit(null);
  }

  getStatusLabel(item: BudgetItem): string {
    console.log(item.status);
    switch (item.status) {
      case BudgetItemStatus.PROCESSED:
        if(item.type == SolutionType.PRODUCT)
          return 'Purchased';
        else
          return 'Reserved';
      case BudgetItemStatus.DENIED: return 'Denied';
      case BudgetItemStatus.PLANNED: return 'Planned';
      case BudgetItemStatus.PENDING: return 'Pending';
      default: return 'Error';
    }
  }

  getStatusColor(status: BudgetItemStatus): string {
    return this.statusClasses[status];
  }

  updatePlannedAmount(item: BudgetItem): void {
    this.budgetService.updateBudgetItem(this.eventId, item).subscribe({
      next: () => {
        this.toasterService.success(`${item.solutionName} has been updated successfully!`, "Budget");
      },
      error: (error: HttpErrorResponse) => {
        this.toasterService.error(error.error.message, "Failed to update planned amount");
      }
    });
  }

  openReservationDialog(item: BudgetItem): void {
    this.dialog.open(ServiceReservationDialogComponent, {
      data: { eventId: this.eventId, serviceId: item.solutionId, plannedAmount: item.plannedAmount }
    });
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
