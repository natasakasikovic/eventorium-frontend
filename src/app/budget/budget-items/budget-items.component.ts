import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../category/model/category.model';
import {ServiceService} from '../../service/service.service';
import {ProductService} from '../../product/product.service';
import {Service} from '../../service/model/service.model';
import {Product} from '../../product/model/product.model';
import {ToastrService} from 'ngx-toastr';

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
  serviceSuggestions: Service[] = [];
  productSuggestion: Product[] = []


  constructor(
    private serviceService: ServiceService,
    private productService: ProductService,
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
       this.searchProducts(formValue.plannedAmount)
      } else {
        this.searchServices(formValue.plannedAmount);
      }
    }
  }

  private searchServices(plannedAmount: number): void {
    this.serviceService.getBudgetSuggestions(this.category.id, plannedAmount, this.eventId).subscribe({
      next: (services: Service[]) => {
        this.productSuggestion = [];
        this.serviceSuggestions = services;
        this.updateTotalPlanned(plannedAmount);
        this.getServiceImages(services);
      }
    });
  }

  private getServiceImages(services: Service[]): void {
    services.forEach(s => this.serviceService.getImage(s.id).subscribe({
      next: (image: Blob) => {
        s.images[0] = URL.createObjectURL(image);
      }
    }));
  }


  private searchProducts(plannedAmount: number): void {
    this.productService.getBudgetSuggestions(this.category.id, plannedAmount).subscribe({
        next: (products: Product[]) => {
          this.serviceSuggestions = [];
          this.productSuggestion = products;
          this.updateTotalPlanned(plannedAmount);
        }
      }
    )
  }

  onDelete(): void {
    this.deleteCategory.emit([this.category.id, false]);
    this.updateTotalPlanned(0);
  }

}
