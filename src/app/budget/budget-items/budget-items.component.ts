import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../category/model/category.model';
import {ServiceService} from '../../service/service.service';
import {ProductService} from '../../product/product.service';
import {Service} from '../../service/model/service.model';
import {Product} from '../../product/model/product.model';
import {BudgetService} from '../budget.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-budget-items',
  templateUrl: './budget-items.component.html',
  styleUrl: './budget-items.component.css'
})
export class BudgetItemsComponent {
  @Input() category: Category;
  @Output() totalPriceChanged = new EventEmitter<number>();
  @Input() budgetId: number;

  @Output() deleteCategory: EventEmitter<number> = new EventEmitter();

  totalPlanned: number;
  previousPlanned: number = 0.0;

  planning: FormGroup = new FormGroup({
    plannedAmount: new FormControl('', Validators.required),
    solutionType: new FormControl("product"),
  });
  serviceSuggestions: Service[] = [];
  productSuggestion: Product[] = []


  constructor(
    private serviceService: ServiceService,
    private productService: ProductService,
    private budgetService: BudgetService
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
            services.forEach(s => this.serviceService.getImage(s.id).subscribe({
              next: (image: Blob) => {
                s.images[0] = URL.createObjectURL(image);
              }
            }));
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
    this.updateTotalPlanned(0);
  }

  onPurchase(product: Product): void {
    this.budgetService.purchase(this.budgetId, {
      category: product.category,
      itemId: product.id,
      plannedAmount: this.planning.value.plannedAmount
    }).subscribe({
      next: (product: Product) => {
        this.productSuggestion = this.productSuggestion.filter(p => p.id !== product.id);
        this.deleteCategory.emit(this.category.id);
        //TODO: change when UX pr is merged
        console.log("Successfully bought product!");
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.error.message);
      }
    });
  }

}
