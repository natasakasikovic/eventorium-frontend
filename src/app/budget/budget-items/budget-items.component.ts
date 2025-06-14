import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../category/model/category.model';
import {ServiceService} from '../../service/service.service';
import {ProductService} from '../../product/product.service';
import {Service} from '../../service/model/service.model';
import {Product} from '../../product/model/product.model';
import {ToastrService} from 'ngx-toastr';
import {BudgetSuggestion} from '../model/budget-suggestion.model';
import {BudgetService} from '../budget.service';

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
  ) {
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
