import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../model/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-five-events',
  templateUrl: './top-five-events.component.html',
  styleUrl: './top-five-events.component.css'
})
export class TopFiveEventsComponent implements OnInit {

  events: Event[];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.loadTopEvents();
  }

  loadTopEvents(): void {
    this.events = this.eventService.getTopEvents();
  }

  navigateToEventsOverview() {
    this.router.navigate(['/events-overview']);
  }

}