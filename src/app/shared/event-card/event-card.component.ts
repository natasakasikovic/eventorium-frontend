import {Component, Input, OnInit} from '@angular/core';
import { EventSummary } from '../../event/model/event-summary.model';
import {EventTypeService} from '../../event-type/event-type.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent implements OnInit {
  @Input() event: EventSummary;
  @Input() showActions: boolean;

  constructor(private eventTypeService: EventTypeService) {
  }

  ngOnInit(): void {
    this.eventTypeService.getImage(this.event.imageId).subscribe({
      next: (blob: Blob) => {
        this.event.image = URL.createObjectURL(blob);
      },
      error: (_) => {
        this.event.image = "/photo_placeholder.png";
      }
    });
  }

}
