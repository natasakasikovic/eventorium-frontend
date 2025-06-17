import {Component, OnInit} from '@angular/core';
import {Category} from '../../category/model/category.model';
import {EventService} from '../../event/event.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../category/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventType} from '../../event-type/model/event-type.model';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {BudgetService} from '../budget.service';
import {Budget} from '../model/budget.model';
import {BudgetItem} from '../model/budget-item.model';

@Component({
  selector: 'app-budget-planning',
  templateUrl: './budget-planning.component.html',
  styleUrl: './budget-planning.component.css'
})
export class BudgetPlanningComponent implements OnInit {
  eventId: number | null;
  eventType: EventType | null;
  disableAdvance: boolean;

  budgetItems: BudgetItem[];
  activeCategories: Category[] = [];
  allCategories: Category[] = [];

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
      this.eventId = params['id'] ?? null;
    });
    this.route.queryParams.subscribe(params => {
      this.disableAdvance = params['disableAdvance'] ?? false;
    })
  }

  private loadBudget(): void {
    this.budgetService.getBudget(this.eventId).subscribe({
      next: (budget: Budget) => {
        this.activeCategories = budget.activeCategories;
      }
    });
  }

  private loadEventType(): void {
    this.eventType = this.eventService.getEventType();
    if (this.eventType) {
      this.addSuggestedCategories();
      this.fetchAllCategories();
    } else {
      this.fetchAllCategories();
    }
  }

  private addSuggestedCategories(): void {
    if (Array.isArray(this.eventType.suggestedCategories))
      this.activeCategories.push(...this.eventType.suggestedCategories);
  }

  insertCategory(): void {
    if (!this.addCategoryForm.invalid && this.activeCategories.indexOf(this.addCategoryForm.value.category) < 0) {
      this.activeCategories.push(this.addCategoryForm.value.category);
    }
  }

  deleteCategory(id: number): void {
    this.activeCategories = this.activeCategories.filter(c => c.id !== id);
  }

  onSubmit(): void {
    void this.router.navigate(['/event-agenda', this.eventId]);
  }

  onTabChange(event: MatTabChangeEvent) {
    if(event.tab.textLabel === "Purchased & Reserved") {
      this.budgetService.getBudgetItems(this.eventId).subscribe({
        next: (budgetItems: BudgetItem[]) => {
          this.budgetItems = budgetItems;
        }
      });
    }
  }

  private fetchAllCategories() {
    this.categoryService.getAll().subscribe({
      next: (categories: Category[]) => {
        this.allCategories = categories;
      }
    });
  }
}
