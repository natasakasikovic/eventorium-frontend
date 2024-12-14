import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../category/model/category.model';
import {ServiceService} from '../../service/service.service';
import {ProductService} from '../../product/product.service';
import {Service} from '../../service/model/service.model';
import {Product} from '../../product/model/product.model';
import {BudgetService} from '../budget.service';
import {EventService} from '../../event/event.service';

@Component({
  selector: 'app-budget-items',
  templateUrl: './budget-items.component.html',
  styleUrl: './budget-items.component.css'
})
export class BudgetItemsComponent {
  @Input() category: Category;

  @Output() deleteCategory: EventEmitter<number> = new EventEmitter();

  totalPlanned: number;

  planning: FormGroup = new FormGroup({
    plannedAmount: new FormControl('', Validators.required),
    solutionType: new FormControl("product"),
  });
  serviceSuggestions: Service[] = [];
  productSuggestion: Product[] = []

  previousPlanned: number = 0.0;

  @Output() totalPriceChanged = new EventEmitter<number>();

  constructor(
    private serviceService: ServiceService,
    private productService: ProductService
  ) {
  }

  updateTotalPlanned(currentPrice: number): void {
    this.totalPriceChanged.emit(currentPrice - this.previousPlanned);
    this.previousPlanned = currentPrice;
  }

  searchItems(): void {
    if (!this.planning.invalid) {
      const formValue = this.planning.value;
      if (formValue.solutionType === 'product') {
        this.productService.getBudgetSuggestions(this.category.id, formValue.plannedAmount).subscribe({
            next: (products: Product[]) => {
              this.serviceSuggestions = [];
              this.productSuggestion = products;
              this.updateTotalPlanned(formValue.plannedAmount);
            },
            error(error: Error) {
              console.error(error.message);
            }
          }

        )
      } else {
        this.serviceService.getBudgetSuggestions(this.category.id, formValue.plannedAmount).subscribe({
          next: (services: Service[]) => {
            this.productSuggestion = [];
            this.serviceSuggestions = services;
            this.updateTotalPlanned(formValue.plannedAmount);
          },
          error(error: Error) {
            console.error(error.message);
          }
        });
      }
    }
  }

  onDelete(): void {
    this.deleteCategory.emit(this.category.id);
  }
}
