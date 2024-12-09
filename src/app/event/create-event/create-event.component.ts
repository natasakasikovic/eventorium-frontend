import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { CreateEventRequestDto } from '../model/create-event-request-dto.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {

  private event: Partial<CreateEventRequestDto>

  constructor(private eventService: EventService) { }

  public updateEvent(): void {
    this.eventService.updateEvent(this.event)
  }
  
}
