import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../category/model/category.model';
import {ServiceService} from '../../service/service.service';
import {ProductService} from '../../product/product.service';
import {Service} from '../../service/model/service.model';
import {Product} from '../../product/model/product.model';
import {ReservationType} from '../../service/model/reservation-type.enum';

@Component({
  selector: 'app-budget-items',
  templateUrl: './budget-items.component.html',
  styleUrl: './budget-items.component.css'
})
export class BudgetItemsComponent {
  @Input() category: Category;

  planning: FormGroup = new FormGroup({
    plannedAmount: new FormControl('', Validators.required),
    solutionType: new FormControl("product"),
  });
  serviceSuggestions: Service[] = [];
  productSuggestion: Product[] = []

  constructor(
    private serviceService: ServiceService,
    private productService: ProductService
  ) {
  }

  searchItems(): void {
    if (!this.planning.invalid) {
      const formValue = this.planning.value;
      if (formValue.solutionType === 'product') {

      } else {
        this.serviceService.getBudgetSuggestions(this.category.id, formValue.plannedAmount).subscribe({
          next: (services: Service[]) => {
            this.serviceSuggestions = services;
          },
          error(error: Error) {
            console.error(error.message);
          }
        });
      }
    }
  }
}
