import {Component, EventEmitter, Output} from '@angular/core';
import {ServiceFilter} from '../../service/model/filter-service-options.model';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-service-filter',
  templateUrl: './service-filter.component.html',
  styleUrl: './service-filter.component.css'
})
export class ServiceFilterComponent {
  @Output() closeFilter: EventEmitter<void> = new EventEmitter();
  @Output() applyFilter: EventEmitter<ServiceFilter> = new EventEmitter();

  categories: string[] =
  [
    "Wellness",
    "Lifestyle",
    "Entertainment",
    "Arts",
    "Creative",
    "Fitness",
    "Travel",
    "Music",
    "Adventure",
    "Education"
  ]
  eventTypes: string[] = ["Group", "Individual", "Social", "Concert", "Trip"];

  filterServiceForm: FormGroup = new FormGroup({
    available: new FormControl(false),
    minPrice: new FormControl(),
    maxPrice: new FormControl(),
    category: new FormControl(""),
    eventType: new FormControl(""),
  });

  onClose(): void {
    this.closeFilter.emit();
  }

  onApply(): void {
    this.applyFilter.emit({
      available: this.filterServiceForm.value.available,
      category: this.filterServiceForm.value.category,
      eventType: this.filterServiceForm.value.eventType,
      maxPrice: this.filterServiceForm.value.maxPrice,
      minPrice: this.filterServiceForm.value.minPrice
    })
  }
}
