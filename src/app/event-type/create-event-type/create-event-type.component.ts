import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Category } from '../../category/model/category.model';
import { CategoryService } from '../../category/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventTypeService } from '../event-type.service';
import { EventType } from '../model/event-type.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event-type.component.html',
  styleUrls: ['./create-event-type.component.css']
})
export class CreateEventTypeComponent {
  selectedCategories: Category[] = [];
  currentlySelectedCategory: Category | null = null;
  availableCategories: Category[];

  createEventTypeForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(private eventTypeService: EventTypeService, private categoryService: CategoryService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAll();
    console.log(this.availableCategories)
  }

  getAll(): void {
    this.categoryService.getAll().subscribe({
      next: (categories: Category[]) => {
        this.availableCategories = categories;
     }
    });
  }

  onCategorySelect(event: MatSelectChange) {
    const category: Category = event.value;
    if (category && !this.selectedCategories.includes(category)) {
      this.selectedCategories.push(category);
    }
  }
  
  removeCategory(index: number) {
    this.selectedCategories.splice(index, 1);
    this.currentlySelectedCategory = null; 
    console.log(this.selectedCategories);
  }

  saveEvent() {
    if (this.createEventTypeForm.invalid || this.selectedCategories.length === 0) {
      console.error('Form is invalid or no categories selected');
      return;
    }
  
    this.eventTypeService.create({
      name: this.createEventTypeForm.value.name,
      description: this.createEventTypeForm.value.description,
      suggestedCategories: this.selectedCategories
    }).subscribe({
      next: (eventType: EventType) => {
        console.log(eventType);
        void this.router.navigate(['home']); // TODO: Update navigation to go to the event types overview page once it's implemented
      },
      error: (e: Error) => {
        console.log(e);
      }
    });
  }
  
}

