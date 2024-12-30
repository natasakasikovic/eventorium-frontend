import { Injectable } from '@angular/core';
import {ChatDialogComponent} from './chat-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {WebSocketService} from '../../web-socket/web-socket-service';
import {ChatMessageRequestDto} from '../../web-socket/model/chat-message-request-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ChatDialogService {

  constructor(
    private webSocketService: WebSocketService,
    private dialog: MatDialog
  ) {}

  openChatDialog(): void {
    this.dialog.open(ChatDialogComponent, {
      width: 'auto',
      height: 'auto',
      panelClass: 'chat-dialog-panel',
    });
  }

  sendMessage(): void {
    const message: ChatMessageRequestDto = {
      chatName: '1_2',
      senderId: 1,
      recipientId: 3,
      message: "Poslata poruka"
    }

    this.webSocketService.sendMessage(message);
  }
}
