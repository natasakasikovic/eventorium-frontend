import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../event.service';
import { CreateEventRequestDto } from '../model/create-event-request.model';
import { EventType } from '../../event-type/model/event-type.model';
import { EventTypeService } from '../../event-type/event-type.service';
import { PrivacyOptions } from '../model/privacy.enum';
import { City } from '../../shared/model/city.model';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';
import { CreatedEvent } from '../model/created-event-response.model';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  createEventForm: FormGroup;
  privacyOptions = Object.values(PrivacyOptions);
  cities: City[];
  eventTypes: EventType[];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private eventTypeService: EventTypeService,
    private sharedService: SharedService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createEventForm = this.fb.group({
      eventType: ['', Validators.required],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      maxParticipants: [null, [Validators.min(1)]],
      privacy: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      eventDate: ['', Validators.required],
    });

    this.getAllEventTypes();
    this.getAllCities();
  }

  onSubmit(): void {
    if (this.createEventForm.valid) {
      const newEvent: CreateEventRequestDto = {
        name: this.createEventForm.get('name').value,
        description: this.createEventForm.get('description').value,
        maxParticipants: this.createEventForm.get('maxParticipants').value,
        privacy: this.createEventForm.get('privacy').value.toUpperCase(),
        address: this.createEventForm.get('address').value,
        city: this.createEventForm.get('city').value,
        date: this.createEventForm.get('eventDate').value,
        eventType: this.createEventForm.get('eventType').value === "all" ? null : this.createEventForm.get('eventType').value
      };

      this.eventService.createEvent(newEvent).subscribe({
        next: (event: CreatedEvent) => {
          this.router.navigate(['budget-planning']); // TODO: send created event to budget-planning component
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.showMessage("", error.message);
          } else {
            this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.SERVER_ERROR);
          }
        }
      });

    }
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        message: message
      }
    })
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
}
