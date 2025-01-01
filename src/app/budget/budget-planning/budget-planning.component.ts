import {Component, OnInit} from '@angular/core';
import {Category} from '../../category/model/category.model';
import {EventService} from '../../event/event.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../category/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventType} from '../../event-type/model/event-type.model';

@Component({
  selector: 'app-budget-planning',
  templateUrl: './budget-planning.component.html',
  styleUrl: './budget-planning.component.css'
})
export class BudgetPlanningComponent implements OnInit {
  id: number | null;
  eventType: EventType | null;

  plannedCategories: Category[] = []
  otherCategories: Category[];

  totalPlanned: number = 0.0;
  addCategoryForm: FormGroup = new FormGroup({
    category: new FormControl('', Validators.required)
  });

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loadParams();
    this.loadEventType();
  }

  private loadParams(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'] ?? null;
    });
  }

  private loadEventType(): void {
    this.eventType = this.eventService.getEventType();
    if (this.eventType) {
      this.addSuggestedCategoriesToPlanned();
      this.fetchOtherCategories();
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
      !this.plannedCategories.includes(category)
    );
  }

  updatePlannedPrice(difference: number) {
    this.totalPlanned += difference;
  }

  insertCategory(): void {
    if (!this.addCategoryForm.invalid && this.plannedCategories.indexOf(this.addCategoryForm.value.category) < 0) {
      this.plannedCategories.push(this.addCategoryForm.value.category);
    }
  }

  deleteCategory(id: number): void {
    this.otherCategories.push(this.plannedCategories.find(c => c.id === id));
    this.plannedCategories = this.plannedCategories.filter(c => c.id !== id);
  }

  onSubmit(): void {
    void this.router.navigate(['/event-agenda', this.id]);
  }
}
