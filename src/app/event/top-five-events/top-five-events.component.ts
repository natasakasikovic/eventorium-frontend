import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { EventSummary } from '../model/event-summary.model';

@Component({
  selector: 'app-top-five-events',
  templateUrl: './top-five-events.component.html',
  styleUrl: './top-five-events.component.css'
})
export class TopFiveEventsComponent implements OnInit {

  events: EventSummary[];

  constructor(private service: EventService, private router: Router) {}

  ngOnInit(): void {
    this.service.getTopEvents().subscribe({
      next: (response: EventSummary[]) => {
        this.events = response
      }
    })
  }

  navigateToEventsOverview() {
    this.router.navigate(['/events-overview']);
  }

}