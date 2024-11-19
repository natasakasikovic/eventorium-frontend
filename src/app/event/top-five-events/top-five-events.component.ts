import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../model/event.model';

@Component({
  selector: 'app-top-five-events',
  templateUrl: './top-five-events.component.html',
  styleUrl: './top-five-events.component.css'
})
export class TopFiveEventsComponent implements OnInit {

  events: Event[];

  constructor(private eventService: EventService ) {}

  ngOnInit(): void {
    this.loadTopEvents();
  }

  loadTopEvents(): void {
    this.events = this.eventService.getTopEvents();
  }

}