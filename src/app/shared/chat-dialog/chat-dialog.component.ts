import {Component, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ChatMessage} from "../../web-socket/model/chat-message.model";
import {AuthService} from "../../auth/auth.service";
import {ChatDialogService} from "./chat-dialog.service";
import {ChatMessageRequestDto} from "../../web-socket/model/chat-message-request-dto.model";
import {WebSocketService} from "../../web-socket/web-socket-service";
import {User} from "../../auth/model/user.model";
import {ChatService} from './chat.service';

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
    @Inject(MAT_DIALOG_DATA) public data: { recipientId: number }
  ) {}

  ngOnInit(): void {
    this.chatService.getMessages(this.userId, this.data.recipientId).subscribe({
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
    this.addMessage({
      message: this.newMessage,
      recipientId: this.data.recipientId,
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
      chatName: `${this.userId}_${this.data.recipientId}`,
      senderId: this.userId,
      recipientId: this.data.recipientId,
      message: this.newMessage
    };
  }

}
