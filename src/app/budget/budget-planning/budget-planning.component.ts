import {Component, OnInit} from '@angular/core';
import {Category} from '../../category/model/category.model';
import {EventService} from '../../event/event.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../category/category.service';

@Component({
  selector: 'app-budget-planning',
  templateUrl: './budget-planning.component.html',
  styleUrl: './budget-planning.component.css'
})
export class BudgetPlanningComponent implements OnInit {
  plannedCategories: Category[] = []
  otherCategories: Category[];

  totalPlanned: number = 0.0;
  addCategoryForm: FormGroup = new FormGroup({
    category: new FormControl('', Validators.required)
  });

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    if(this.eventService.eventType?.suggestedCategories) {
      this.plannedCategories.push(...this.eventService.eventType?.suggestedCategories);
    }
    this.categoryService.getAll().subscribe({
      next: (categories: Category[]) => {
        this.otherCategories = categories.filter(item => this.plannedCategories.indexOf(item) < 0);
      }
    })
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

  }
}
