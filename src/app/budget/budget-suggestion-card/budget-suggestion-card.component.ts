import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BudgetSuggestion} from '../model/budget-suggestion.model';
import {ProductService} from '../../product/product.service';
import {ServiceService} from '../../service/service.service';
import {SolutionType} from '../model/solution-type.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-budget-suggestion-card',
  templateUrl: './budget-suggestion-card.component.html',
  styleUrl: './budget-suggestion-card.component.css'
})
export class BudgetSuggestionCardComponent implements OnInit, OnDestroy {
  @Input() budgetSuggestion: BudgetSuggestion;
  @Input() eventId: number;
  @Input() plannedAmount: number;

  constructor(
    private productService: ProductService,
    private serviceService: ServiceService,
    private router: Router,
  ) {}


  ngOnInit(): void {
    if(this.budgetSuggestion.solutionType == SolutionType.PRODUCT)
      this.loadProductImage();
    else
      this.loadServiceImage();
  }

  private loadServiceImage(): void {
    this.serviceService.getImage(this.budgetSuggestion.id).subscribe({
      next: (blob: Blob) => {
        this.budgetSuggestion.image = URL.createObjectURL(blob);
      },
      error: (_) => {
        this.budgetSuggestion.image = "/photo_placeholder.png";
      }
    });
  }

  onClick(): void {
    const queryParams = {
      eventId: this.eventId,
      plannedAmount: this.plannedAmount,
    };
    if(this.budgetSuggestion.solutionType == SolutionType.PRODUCT)
      void this.router.navigate(["/product-details", this.budgetSuggestion.id], { queryParams });
    else
      void this.router.navigate(['/service-details', this.budgetSuggestion.id], { queryParams });
  }

  private loadProductImage(): void {
    this.productService.getImage(this.budgetSuggestion.id).subscribe({
      next: (blob: Blob) => {
        this.budgetSuggestion.image = URL.createObjectURL(blob);
      },
      error: (_) => {
        this.budgetSuggestion.image = "/photo_placeholder.png";
      }
    });
  }

  ngOnDestroy(): void {
    URL.revokeObjectURL(this.budgetSuggestion.image);
  }

}
