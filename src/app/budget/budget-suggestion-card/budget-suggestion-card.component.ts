import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BudgetSuggestion} from '../model/budget-suggestion.model';
import {ProductService} from '../../product/product.service';
import {ServiceService} from '../../service/service.service';
import {SolutionType} from '../model/solution-type.enum';
import {Router} from '@angular/router';
import {Category} from '../../category/model/category.model';
import {BudgetService} from '../budget.service';

@Component({
  selector: 'app-budget-suggestion-card',
  templateUrl: './budget-suggestion-card.component.html',
  styleUrl: './budget-suggestion-card.component.css'
})
export class BudgetSuggestionCardComponent implements OnInit, OnDestroy {
  @Input() budgetSuggestion: BudgetSuggestion;
  @Input() activeCategories: Category[];
  @Input() eventId: number;
  @Input() plannedAmount: number;

  @Output() createItem: EventEmitter<BudgetSuggestion> = new EventEmitter();

  constructor(
    private productService: ProductService,
    private serviceService: ServiceService,
    private budgetService: BudgetService,
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

  onSeeMoreClick(): void {
    const queryParams = {
      eventId: this.eventId,
      plannedAmount: this.plannedAmount,
    };
    if(this.budgetSuggestion.solutionType == SolutionType.PRODUCT)
      void this.router.navigate(["/product-details", this.budgetSuggestion.id], { queryParams });
    else
      void this.router.navigate(['/service-details', this.budgetSuggestion.id], { queryParams });

    this.budgetService.updateActiveCategories(this.eventId, this.activeCategories).subscribe();

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
