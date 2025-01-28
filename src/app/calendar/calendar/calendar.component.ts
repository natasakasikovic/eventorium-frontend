import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import { CalendarService } from '../calendar.service';
import { CalendarEvent } from '../model/calendar-event.model';
import { Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  events: CalendarEvent[] = [];
  eventsOnDate: CalendarEvent[] = [];
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getAttendingEvents().subscribe({
      next: (events: CalendarEvent[]) => {
        this.events = events;
        this.mapToCalendar();
      }
    })
  }

  mapToCalendar() {
    this.calendarOptions.events = this.events.map(event => ({
      title: event.name,
      date: event.date
    }));
  }

  handleDateClick(arg: any) {
    this.selectedDate = arg.dateStr;
    this.eventsOnDate = this.events.filter(event => event.date === this.selectedDate);
  }
  
}
