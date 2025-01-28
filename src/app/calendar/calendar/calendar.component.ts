import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import { CalendarService } from '../calendar.service';
import { CalendarEvent } from '../model/calendar-event.model';
import { AuthService } from '../../auth/auth.service';
import { CalendarReservation } from '../model/calendar-reservation.model';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

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
  reservations: CalendarReservation[] = [];
  reservationsOnDate: CalendarReservation[] = [];
  
  selectedDate: Date | null = null;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'title',
      center: '',
      right: 'prev,next'
    },
    dateClick: this.handleDateClick.bind(this)
  };

  constructor(
    private service: CalendarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.service.getAttendingEvents().subscribe({
      next: (events: CalendarEvent[]) => {
        this.events = events;
        this.mapEvents(events);
      }
    })
    this.addOrganizerEvents();
    this.addReservations();
  }

  addOrganizerEvents() {
    if (this.authService.getRole() === 'EVENT_ORGANIZER') {
      this.service.getOrganizerEvents().subscribe({
        next: (events: CalendarEvent[]) => {
          this.organizerEvents = events;
          this.mapEvents(events);
        }
      })
    } 
  }

  addReservations() {
    if (this.authService.getRole() === 'PROVIDER') {
      this.service.getServiceReservations().subscribe({
        next: (reservations: CalendarReservation[]) => {
          this.reservations = reservations;
          this.mapReservations(reservations);
        }
      })
    }
  }

  mapEvents(events: CalendarEvent[]) {
    this.calendarOptions.events = events.map(event => ({
      title: event.name,
      date: event.date
    }));
  }

  mapReservations(reservation: CalendarReservation[]) {
    const mappedReservations = reservation
      .map(res => res.date)
      .filter((value, index, self) => self.indexOf(value) === index);
  
    this.calendarOptions.events = mappedReservations.map(date => ({
      title: 'Reservations',
      date: date
    }));
  }

  handleDateClick(arg: DateClickArg) {
    this.selectedDate = new Date(arg.dateStr); 
  
    this.eventsOnDate = this.events.filter(event => new Date(event.date).toDateString() === this.selectedDate.toDateString());
    this.organizerEventsOnDate = this.organizerEvents.filter(event => new Date(event.date).toDateString() === this.selectedDate.toDateString());
    this.reservationsOnDate = this.reservations.filter(reservation => new Date(reservation.date).toDateString() === this.selectedDate.toDateString());
  }
}
