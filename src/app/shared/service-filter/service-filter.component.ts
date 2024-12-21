import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ServiceFilter} from '../../service/model/filter-service-options.model';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryService} from '../../category/category.service';
import {Category} from '../../category/model/category.model';
import {EventType} from '../../event-type/model/event-type.model';
import {EventTypeService} from '../../event-type/event-type.service';


@Component({
  selector: 'app-service-filter',
  templateUrl: './service-filter.component.html',
  styleUrl: './service-filter.component.css'
})
export class ServiceFilterComponent implements OnInit {
  @Output() closeFilter: EventEmitter<void> = new EventEmitter();
  @Output() applyFilter: EventEmitter<ServiceFilter> = new EventEmitter();

  categories: string[] = [];
  eventTypes: string[] = [];

  filterServiceForm: FormGroup = new FormGroup({
    available: new FormControl(false),
    minPrice: new FormControl(),
    maxPrice: new FormControl(),
    category: new FormControl(""),
    eventType: new FormControl(""),
  });

  constructor(
    private categoryService: CategoryService,
    private eventTypeService: EventTypeService
  ) {
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (category: Category[]) => {
        this.categories = category.map(category => category.name);
      }
    });
    this.eventTypeService.getAll().subscribe({
      next: (eventTypes: EventType[]) => {
        this.eventTypes = eventTypes.map(eventType => eventType.name)
      }
    })
  }

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
