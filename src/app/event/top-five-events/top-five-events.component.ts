import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../model/event.model';
import { Router } from '@angular/router';
import { PagedResponse } from '../../shared/model/paged-response.model';

@Component({
  selector: 'app-top-five-events',
  templateUrl: './top-five-events.component.html',
  styleUrl: './top-five-events.component.css'
})
export class TopFiveEventsComponent implements OnInit {

  events: Event[];

  constructor(private service: EventService, private router: Router) {}

  ngOnInit(): void {
    this.service.getTopEvents().subscribe({
      next: (response: Event[]) => {
        this.events = response
      }
    })
  }

  navigateToEventsOverview() {
    this.router.navigate(['/events-overview']);
  }

}