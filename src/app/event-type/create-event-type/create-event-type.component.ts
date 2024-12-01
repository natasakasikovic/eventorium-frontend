import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event-type.component.html',
  styleUrls: ['./create-event-type.component.css']
})
export class CreateEventTypeComponent {
  selectedCategories: string[] = [];
  currentlySelectedCategory: string | null = null;
  availableCategories: string[] = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
    'Category 5',
    'Category 6',
    'Category 7',
    'Category 8'
  ];

  onCategorySelect(event: MatSelectChange) {
    const category: string = event.value;
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
    console.log('Event saved');
    console.log('Selected categories:', this.selectedCategories);
  }
}
