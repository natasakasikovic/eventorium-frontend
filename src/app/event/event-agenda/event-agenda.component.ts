import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivityRequest } from '../model/activity-request.model';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CreateEventRequestDto } from '../model/create-event-request-dto.model';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-agenda',
  templateUrl: './event-agenda.component.html',
  styleUrl: './event-agenda.component.css'
})
export class EventAgendaComponent {
  
  displayedColumns: string[] = ['Activity name', 'Location', 'From', 'To', 'Description'];
  dataSource = new MatTableDataSource<ActivityRequest>([]);
  agendaForm: FormGroup;

  activities: ActivityRequest[] = [];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.agendaForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required]
    });
  }

  addActivity(name: string, location: string, description: string, startTime: string, endTime: string): void {
    const newActivity: ActivityRequest = {
      name,
      location,
      description,
      startTime,
      endTime,
    };
    
    this.activities.push(newActivity);
    this.dataSource.data = this.activities;
  }

  add(): void {
    if (this.agendaForm.valid) {
      const { name, location, description, from, to } = this.agendaForm.value;
      this.addActivity(name, location, description, from, to);
      this.agendaForm.reset();
    }
  }

  finish(): void {
    if (this.activities.length != 0) {
      const event: Partial<CreateEventRequestDto> = {
        activities : this.activities
      }

      this.eventService.updateEvent(event);
      this.eventService.createEvent().subscribe({
        next: (response) => {
          console.log("Successfully created:", response);
        },
        error: (err) => {
          console.error("Error while creating event:", err);
        }
      })
    }
  }

  exportToPdf(): void {
    console.log('Exporting to PDF'); // not implemented!
  }

}
