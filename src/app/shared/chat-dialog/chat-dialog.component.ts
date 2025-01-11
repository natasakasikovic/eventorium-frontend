import {Component, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ChatMessage} from "../../web-socket/model/chat-message.model";
import {AuthService} from "../../auth/auth.service";
import {ChatDialogService} from "./chat-dialog.service";
import {ChatMessageRequestDto} from "../../web-socket/model/chat-message-request-dto.model";
import {WebSocketService} from "../../web-socket/web-socket-service";
import {User} from "../../auth/model/user.model";
import {ChatService} from './chat.service';
import {Provider} from '../../web-socket/model/chat-user.model';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrl: './chat-dialog.component.css'
})
export class ChatDialogComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage: string;

  constructor(
    private authService: AuthService,
    private webSocketService: WebSocketService,
    private chatService: ChatService,
    public dialogRef: MatDialogRef<ChatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { recipient: Provider }
  ) {}

  ngOnInit(): void {
    this.chatService.getMessages(this.userId, this.data.recipient.id).subscribe({
      next: (messages: ChatMessage[]) => {
        this.messages = messages;
      }
    })
  }

  get userId(): number {
    return this.authService.getUserId();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  sendMessage(): void {
    if(this.newMessage.trim().length === 0) {
      return;
    }
    this.addMessage({
      message: this.newMessage,
      recipientId: this.data.recipient.id,
      senderId: this.userId
    });
    const request = this.getRequest();
    this.webSocketService.sendMessage(request);
    this.newMessage = "";
  }

  addMessage(message: ChatMessage): void {
    this.messages.push(message);
  }

  private getRequest(): ChatMessageRequestDto {
    return {
      senderId: this.userId,
      recipientId: this.data.recipient.id,
      message: this.newMessage
    };
  }

}
