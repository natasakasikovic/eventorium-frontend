import {Component, OnInit} from '@angular/core';
import {Category} from '../../category/model/category.model';
import {EventService} from '../../event/event.service';

@Component({
  selector: 'app-budget-planning',
  templateUrl: './budget-planning.component.html',
  styleUrl: './budget-planning.component.css'
})
export class BudgetPlanningComponent implements OnInit {
  plannedCategories: Category[] = []

  constructor(
    private eventService: EventService
  ) {
  }
  ngOnInit(): void {
    this.plannedCategories.push(...this.eventService.eventType?.suggestedCategories);
  }

}
