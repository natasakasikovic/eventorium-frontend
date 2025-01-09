import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { City } from '../../shared/model/city.model';
import { EventType } from '../../event-type/model/event-type.model';
import { EventTypeService } from '../../event-type/event-type.service';
import { SharedService } from '../../shared/shared.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { EventFilter } from '../model/event-filter.model';

@Component({
  selector: 'app-events-filter-dialog',
  templateUrl: './events-filter-dialog.component.html',
  styleUrl: './events-filter-dialog.component.css'
})
export class EventsFilterDialogComponent implements OnInit{

  cities: City[];
  eventTypes: EventType[];
  filterForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EventsFilterDialogComponent>,
    private eventTypeService: EventTypeService,
    private sharedService: SharedService,
    private fb: FormBuilder) {

      this.filterForm = this.fb.group({
        name: [''],
        description: [''],
        eventType: [''],
        maxParticipants: ['', this.greaterThanZero()],
        city: [''],
        from: ['', this.dateNotInThePast()],
        to: ['', this.dateNotInThePast()]
      });
    }

    greaterThanZero(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        if (control.value == null || control.value === '') return null;
        return control.value > 0 ? null : { greaterThanZero: true };
      };
    }

    dateNotInThePast(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const date = control.value;
        if (date == null || date === '') return null
        if (date && new Date(date) < new Date()) return { dateInThePast: true };
        return null;
      };
    }

  ngOnInit(): void {
    this.getAllCities()
    this.getAllEventTypes()
  }

  private getAllEventTypes(): void {
    this.eventTypeService.getAll().subscribe({
      next: (eventTypes: EventType[]) => (this.eventTypes = eventTypes),
    });
  }

  private getAllCities(): void {
    this.sharedService.getCities().subscribe({
      next: (cities: City[]) => (this.cities = cities),
    });
  }

  applyFilters() {
    if (this.filterForm.valid) {
      const filter = this.getValues()
      this.dialogRef.close(filter);
    }
  }

  getValues(): EventFilter {
    const formValues = this.filterForm.value;

    return {
      name: formValues.name,
      description: formValues.description,
      type: formValues.eventType,
      location: formValues.location,
      maxParticipants: formValues.maxParticipants,
      from: formValues.from === "" ? null : this.formatToDate(formValues.from),
      to: formValues.to === "" ? null : this.formatToDate(formValues.to),
    };
  }

  formatToDate(date: Date): string {
    if (!(date instanceof Date)) date = new Date(date);

    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
  }
}