import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ChatRoom} from '../model/chat-room.model';

@Component({
  selector: 'app-chat-room-card',
  templateUrl: './chat-room-card.component.html',
  styleUrl: './chat-room-card.component.css'
})
export class ChatRoomCardComponent {
  @Input() chatRoom: ChatRoom

  selectRoom(): void {

  }
}
