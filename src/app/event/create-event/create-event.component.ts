import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../event.service';
import { CreateEventRequestDto } from '../model/create-event-request.model';
import { EventType } from '../../event-type/model/event-type.model';
import { EventTypeService } from '../../event-type/event-type.service';
import { Privacy, PrivacyOptions } from '../model/privacy.enum';
import { City } from '../../shared/model/city.model';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';

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
    private router: Router
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
        privacy: this.createEventForm.get('privacy').value.toUpperCase(),
        address: this.createEventForm.get('address').value,
        city: this.createEventForm.get('city').value,
        date: this.createEventForm.get('eventDate').value,
        eventType: this.createEventForm.get('eventType').value === "all" ? null : this.createEventForm.get('eventType').value
      };

      this.eventService.updateEvent(newEvent);

      if (newEvent.privacy == Privacy.CLOSED.toUpperCase()) { // TODO: Temporarily navigate to 'event-invitations', change to 'budget' when it is implemented
        this.router.navigate(['event-invitations'])
      }  

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
