import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../event.service';
import { CreateEventRequestDto } from '../model/create-event-request-dto.model';
import { EventType } from '../../event-type/model/event-type.model';
import { EventTypeService } from '../../event-type/event-type.service';
import { PrivacyOptions } from '../model/privacy.enum';
import { City } from '../../shared/model/city.model';
import { SharedService } from '../../shared/shared.service';
import { AuthService } from '../../auth/auth.service';

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
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.createEventForm = this.fb.group({
      eventType: ['', Validators.required],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
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
      const newEvent: Partial<CreateEventRequestDto> = {
        name: this.createEventForm.get('name').value,
        description: this.createEventForm.get('description').value,
        maxParticipants: this.createEventForm.get('maxParticipants').value,
        privacy: this.createEventForm.get('privacy').value,
        address: this.createEventForm.get('address').value,
        city: this.createEventForm.get('city').value,
        date: this.createEventForm.get('eventDate').value,
        // organizerId: this.authService.getUserId(), // TODO: Fix this when the token generation method is changed on the backend
        eventType: this.createEventForm.get('eventType').value === "All" // TODO: change this, not working this way
          ? null 
          : this.createEventForm.get('eventType').value
      };
  
      this.eventService.updateEvent(newEvent);
      console.log(newEvent);
    }
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
