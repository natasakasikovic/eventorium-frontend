import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import { CalendarService } from '../calendar.service';
import { CalendarEvent } from '../model/calendar-event.model';
import { Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  events: CalendarEvent[] = [];
  eventsOnDate: CalendarEvent[] = [];
  organizerEvents: CalendarEvent[] = [];
  organizerEventsOnDate: CalendarEvent[] = [];
  selectedDate: Date | null = null;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'title',
      center: '',
      right: 'prev,next'
    },
    dateClick: this.handleDateClick.bind(this),
  };

  constructor(
    private service: CalendarService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.service.getAttendingEvents().subscribe({
      next: (events: CalendarEvent[]) => {
        this.events = events;
        this.mapToCalendar(events);
      }
    })
    if (this.authService.getRole() === 'EVENT_ORGANIZER') {
      this.service.getOrganizerEvents().subscribe({
        next: (events: CalendarEvent[]) => {
          this.organizerEvents = events;
          this.mapToCalendar(events);
        }
      })
    } 
  }

  mapToCalendar(events: CalendarEvent[]) {
    this.calendarOptions.events = events.map(event => ({
      title: event.name,
      date: event.date
    }));
  }

  handleDateClick(arg: any) {
    this.selectedDate = arg.dateStr;
    this.eventsOnDate = this.events.filter(event => event.date === this.selectedDate);
    this.organizerEventsOnDate = this.organizerEvents.filter(event => event.date === this.selectedDate)
  }
  
}
