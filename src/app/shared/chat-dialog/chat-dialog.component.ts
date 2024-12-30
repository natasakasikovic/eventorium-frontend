import {Component, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ChatMessage} from "../../web-socket/model/chat-message.model";
import {AuthService} from "../../auth/auth.service";
import {ChatDialogService} from "./chat-dialog.service";
import {ChatMessageRequestDto} from "../../web-socket/model/chat-message-request-dto.model";
import {WebSocketService} from "../../web-socket/web-socket-service";
import {User} from "../../auth/model/user.model";

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrl: './chat-dialog.component.css'
})
export class ChatDialogComponent {
  messages: ChatMessage[] = [];
  newMessage: string;

  constructor(
    private authService: AuthService,
    private webSocketService: WebSocketService,
    public dialogRef: MatDialogRef<ChatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { recipientId: number }
  ) {}

  get userId(): number {
    return this.authService.getUserId();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  sendMessage(): void {
    const senderId = this.authService.getUserId();
    const request: ChatMessageRequestDto = {
      chatName: `${senderId}_${this.data.recipientId}`,
      senderId: senderId,
      recipientId: this.data.recipientId,
      message: this.newMessage
    }
    this.webSocketService.sendMessage(request);
    this.messages.push({
      message: this.newMessage,
      recipient: this.data.recipientId,
      sender: senderId
    });
    this.newMessage = "";
  }

}
