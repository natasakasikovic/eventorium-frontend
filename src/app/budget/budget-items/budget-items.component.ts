import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../category/model/category.model';
import {ToastrService} from 'ngx-toastr';
import {BudgetSuggestion} from '../model/budget-suggestion.model';
import {BudgetService} from '../budget.service';
import {BudgetItem} from '../model/budget-item.model';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-budget-items',
  templateUrl: './budget-items.component.html',
  styleUrl: './budget-items.component.css'
})
export class BudgetItemsComponent {
  @Input() category: Category;
  @Input() eventId: number;

  @Output() deleteCategory: EventEmitter<[number, boolean]> = new EventEmitter();
  @Output() totalPriceChanged = new EventEmitter<number>();

  totalPlanned: number;
  previousPlanned: number = 0.0;

  planning: FormGroup = new FormGroup({
    plannedAmount: new FormControl(0, Validators.required),
    solutionType: new FormControl("product"),
  });
  budgetSuggestions: BudgetSuggestion[];


  constructor(
    private budgetService: BudgetService,
    private toasterService: ToastrService
  ) {
  }

  createBudgetItem(suggestion: BudgetSuggestion): void {
    if (this.planning.valid) {
      this.budgetService.createBudgetItem(this.eventId, {
        category: this.category,
        itemId: suggestion.id,
        itemType: suggestion.solutionType,
        plannedAmount: this.planning.value.plannedAmount
      }).subscribe({
        next: (item: BudgetItem) => {
          this.totalPlanned += item.plannedAmount;
          this.toasterService.success(`'${item.solutionName}' has been added to planner successfully`, "Success");
        },
        error: (error: HttpErrorResponse) => {
          this.toasterService.error(error.error.message, "Failed to add to budget planner");
        }
      });
    }
  }

  updateTotalPlanned(currentPrice: number): void {
    this.totalPriceChanged.emit(currentPrice - this.previousPlanned);
    this.previousPlanned = currentPrice;
  }

  searchItems(): void {
    if (!this.planning.invalid) {
      const plannedAmount = this.planning.value.plannedAmount;
      this.budgetService.getBudgetSuggestions(this.eventId, this.category.id, plannedAmount).subscribe({
        next: (suggestions: BudgetSuggestion[]) => {
          this.budgetSuggestions = suggestions;
        }
      });
    }
  }

  onDelete(): void {
    this.deleteCategory.emit([this.category.id, false]);
    this.updateTotalPlanned(0);
  }
}
