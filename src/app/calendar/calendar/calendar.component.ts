import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core/index.js';
import { CalendarService } from '../calendar.service';
import { CalendarEvent } from '../model/calendar-event.model';
import { AuthService } from '../../auth/auth.service';
import { CalendarReservation } from '../model/calendar-reservation.model';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { areDatesEqual } from '../../shared/utils/date-utils';

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

  eventInputs: EventInput[] = []; 
  
  selectedDate: Date | null = null;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
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
        this.updateCalendarEvents();
      }
    });
  
    this.addOrganizerEvents();
    this.addReservations();
  }
  
  addOrganizerEvents() {
    if (this.authService.getRole() === 'EVENT_ORGANIZER') {
      this.service.getOrganizerEvents().subscribe({
        next: (events: CalendarEvent[]) => {
          this.organizerEvents = events;
          this.mapEvents(events);
          this.updateCalendarEvents();
        }
      });
    }
  }
  
  addReservations() {
    if (this.authService.getRole() === 'PROVIDER') {
      this.service.getServiceReservations().subscribe({
        next: (reservations: CalendarReservation[]) => {
          this.reservations = reservations;
          this.mapReservations(reservations);
          this.updateCalendarEvents();
        }
      });
    }
  }

  mapEvents(events: CalendarEvent[]) {
    this.eventInputs.push(...events.map(event => ({
      title: event.name,
      date: event.date
    })));
  }

  mapReservations(reservation: CalendarReservation[]) {
    const mappedReservations = reservation
      .map(res => res.date)
      .filter((value, index, self) => self.indexOf(value) === index);
  
    this.eventInputs.push(...mappedReservations.map(date => ({
      title: 'Reservations',
      date: date
    })));
  }
  
  updateCalendarEvents() {
    this.calendarOptions.events = [...this.eventInputs];
  }
  
  handleDateClick(arg: DateClickArg) {
    this.selectedDate = new Date(arg.date);
  
    this.eventsOnDate = this.events.filter(event => areDatesEqual(new Date(event.date), this.selectedDate));
    this.organizerEventsOnDate = this.organizerEvents.filter(event => areDatesEqual(new Date(event.date), this.selectedDate));
    this.reservationsOnDate = this.reservations.filter(reservation => areDatesEqual(new Date(reservation.date), this.selectedDate));
  }
  
}
