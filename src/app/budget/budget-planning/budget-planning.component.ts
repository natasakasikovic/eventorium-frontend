import {Component, OnInit, Predicate} from '@angular/core';
import {Category} from '../../category/model/category.model';
import {EventService} from '../../event/event.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../category/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventType} from '../../event-type/model/event-type.model';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {Product} from '../../product/model/product.model';
import {BudgetService} from '../budget.service';
import {Budget} from '../model/budget.model';

@Component({
  selector: 'app-budget-planning',
  templateUrl: './budget-planning.component.html',
  styleUrl: './budget-planning.component.css'
})
export class BudgetPlanningComponent implements OnInit {
  id: number | null;
  eventType: EventType | null;

  purchasedProducts: Product[];
  plannedCategories: Category[] = []
  otherCategories: Category[];

  totalPlanned: number = 0.0;
  totalSpent: number = 0.0;

  addCategoryForm: FormGroup = new FormGroup({
    category: new FormControl('', Validators.required)
  });

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService,
    private budgetService: BudgetService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loadParams();
    this.loadEventType();
    this.loadBudget();
  }

  private loadParams(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'] ?? null;
    });
  }

  private loadBudget(): void {
    this.budgetService.getBudget(this.id).subscribe({
      next: (budget: Budget) => {

        if(budget.items.length > 0) {
          this.updateSpentPrice(budget.spentAmount);
          this.updatePlannedPrice(budget.plannedAmount);

          const purchasedCategories: Category[] = [...budget.items.map(item => item.category)];
          this.plannedCategories = this.plannedCategories.filter(category =>
            !purchasedCategories.some(purchased => purchased.id == category.id));
          this.otherCategories = this.otherCategories.filter(category => purchasedCategories.some(
            purchased => purchased.id !== category.id
          ));
        }
      }
    });
  }

  private loadEventType(): void {
    this.eventType = this.eventService.getEventType();
    if (this.eventType) {
      this.addSuggestedCategoriesToPlanned();
      this.fetchOtherCategories();
    } else {
      this.fetchAllCategories();
    }
  }

  private addSuggestedCategoriesToPlanned(): void {
    if (Array.isArray(this.eventType.suggestedCategories)) {
      this.plannedCategories.push(...this.eventType.suggestedCategories);
    }
  }

  private fetchOtherCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (categories: Category[]) => {
        this.filterOtherCategories(categories);
      },
      error: (err) => {
        console.error('Failed to fetch categories:', err);
      }
    });
  }

  private filterOtherCategories(categories: Category[]): void {
    this.otherCategories = categories.filter(category =>
      !this.plannedCategories.some(plannedCategory => plannedCategory.id === category.id)
    );
  }

  updatePlannedPrice(difference: number) {
    this.totalPlanned += difference;
  }

  updateSpentPrice(amount: number) {
    this.totalSpent += amount;
  }

  insertCategory(): void {
    if (!this.addCategoryForm.invalid && this.plannedCategories.indexOf(this.addCategoryForm.value.category) < 0) {
      this.plannedCategories.push(this.addCategoryForm.value.category);
      this.otherCategories = this.otherCategories
        .filter(category => category.id !== this.addCategoryForm.value.category.id);
    }
  }

  deleteCategory([id, purchased]: [number, boolean]): void {
    if(!purchased) {
      this.otherCategories.push(this.plannedCategories.find(c => c.id === id));
    }
    this.plannedCategories = this.plannedCategories.filter(c => c.id !== id);
  }

  onSubmit(): void {
    void this.router.navigate(['/event-agenda', this.id]);
  }

  onTabChange(event: MatTabChangeEvent) {
    if(event.tab.textLabel === "Purchased & Reserved") {
      this.getPurchased();
    }
  }

  private getPurchased(): void {
    this.budgetService.getPurchased(this.id).subscribe({
      next: (products: Product[]) => {
        this.purchasedProducts = products;
      }
    });
  }

  private fetchAllCategories() {
    this.categoryService.getAll().subscribe({
      next: (categories: Category[]) => {
        this.otherCategories = categories;
      },
      error: (err) => {
        console.error('Failed to fetch categories:', err);
      }
    });
  }
}
