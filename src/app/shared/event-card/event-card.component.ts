import { Component, Input } from '@angular/core';
import { EventSummary } from '../../event/model/event-summary.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() event: EventSummary;
}
