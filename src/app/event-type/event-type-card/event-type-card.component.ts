import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventType } from '../model/event-type.model';

@Component({
  selector: 'app-event-type-card',
  templateUrl: './event-type-card.component.html',
  styleUrl: './event-type-card.component.css'
})
export class EventTypeCardComponent {
  @Input() eventType: EventType;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  onDelete(): void {
    this.delete.emit(this.eventType.id); 
  }

  onEdit(): void {
    this.edit.emit(this.eventType.id); 
  }
}
