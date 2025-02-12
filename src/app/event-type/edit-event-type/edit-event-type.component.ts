import { Component, OnInit } from '@angular/core';
import { EventType } from '../model/event-type.model';
import { MatSelectChange } from '@angular/material/select';
import { Category } from '../../category/model/category.model';
import { EventTypeService } from '../event-type.service';
import { CategoryService } from '../../category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-event-type',
  templateUrl: './edit-event-type.component.html',
  styleUrl: './edit-event-type.component.css'
})
export class EditEventTypeComponent implements OnInit {
  eventType: EventType;
  currentlySelectedCategory: Category | null = null;
  availableCategories: Category[];
  selectedCategories: Category[];

  editEventTypeForm: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required)
  });

  constructor(private eventTypeService: EventTypeService, 
    private categoryService: CategoryService, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategories();
    this.route.params.subscribe((params) => {
      const id = +params['id']
      this.eventTypeService.get(id).subscribe({
        next: (data: EventType) => {
          this.eventType = data;
          this.editEventTypeForm.patchValue({
            description: this.eventType.description
          });
          this.selectedCategories = this.eventType.suggestedCategories;
        }
      })
    })
  }

  getCategories(): void {
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
  }

  saveEventType() {
    if (this.editEventTypeForm.invalid || this.selectedCategories.length === 0) {
      return;
    }
    
    this.eventTypeService.update(this.eventType.id, {
      name: this.eventType.name,
      description: this.editEventTypeForm.value.description,
      suggestedCategories: this.selectedCategories
    }).subscribe(
      {
        next: () => {
          void this.router.navigate(['event-types']); 
        }
      }
    )
  }
}
