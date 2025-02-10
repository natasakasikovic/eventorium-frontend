import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventType } from '../../event-type/model/event-type.model';
import { City } from '../../shared/model/city.model';
import { EventTypeService } from '../../event-type/event-type.service';
import { SharedService } from '../../shared/shared.service';
import { Event } from '../model/event.model';
import { forkJoin } from 'rxjs';
import { UpdateEventRequest } from '../model/update-event-request.model';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MESSAGES } from '../../shared/constants/messages';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent implements OnInit {
  id: number;
  editForm: FormGroup;
  cities: City[];
  eventTypes: EventType[];
  event: Event;
  updatedEvent: UpdateEventRequest;

  constructor(
    private service: EventService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private eventTypeService: EventTypeService,
    private sharedService: SharedService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.initializeForm();
    this.loadData();
  }
  
  private loadData(): void {
    forkJoin({
      cities: this.sharedService.getCities(),
      eventTypes: this.eventTypeService.getAll(),
      event: this.service.getEvent(this.id)
    }).subscribe({
      next: ({ cities, eventTypes, event }) => {
        this.cities = cities;
        this.eventTypes = eventTypes;
        this.event = event;
        this.patchValues();
      },
      error: (error: HttpErrorResponse) => this.handleError(error)
    });
  }

  initializeForm(): void {
    this.editForm = this.fb.group({
      eventType: ['', Validators.required],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      maxParticipants: [null, [Validators.min(1)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      eventDate: ['', Validators.required]
    })
  }


  patchValues(): void {
    const selectedCity = this.cities.find(city => city.id === this.event.city.id);
    const selectedEventType = this.eventTypes.find(type => type.id === this.event.type?.id);
    this.editForm.patchValue({
      name: this.event.name,
      description: this.event.description,
      eventType: selectedEventType || 'all',
      city: selectedCity,
      address: this.event.address,
      maxParticipants: this.event.maxParticipants,
      eventDate: this.event.date
    })
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.updatedEvent = this.getFormFields();
      this.service.updateEvent(this.id, this.updatedEvent).subscribe({
        next: (_) => {
          this.showMessage(MESSAGES.success, MESSAGES.eventUpdated);
          void this.router.navigate(['manageable-events']);
        },
        error: (error: HttpErrorResponse) => this.handleError(error)
      })
    }
  }

  getFormFields(): UpdateEventRequest {
    const { eventType, eventDate, ...event } = this.editForm.value;
  
    let date: Date;
    if (typeof eventDate === 'string') date = new Date(eventDate);
    else date = new Date(eventDate.getTime() - eventDate.getTimezoneOffset() * 60000);

    return {
      ...event,
      eventType: eventType === "all" ? null : eventType,
      date: date
    };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status > 500)
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.SERVER_ERROR)
    else
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, error.error.message)
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: { title: title, message: message }
    })
  }

}
