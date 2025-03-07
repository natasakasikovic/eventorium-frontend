import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ChatRoomService} from '../chat-room.service';
import {ChatRoom} from '../model/chat-room.model';
import {ChatMessage} from '../../web-socket/model/chat-message.model';
import {ChatService} from '../../shared/chat-dialog/chat.service';
import {AuthService} from '../../auth/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ChatDialogService} from '../../shared/chat-dialog/chat-dialog.service';
import {WebSocketService} from '../../web-socket/web-socket-service';
import {ChatMessageRequestDto} from '../../web-socket/model/chat-message-request-dto.model';
import {Subscription} from 'rxjs';
import {ChatCommunicationService} from '../chat-communication.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  chatRooms: ChatRoom[];
  messages: ChatMessage[];
  selectedRoom: ChatRoom;
  newMessage: string;

  private subscription!: Subscription;

  constructor(
    private service: ChatRoomService,
    private chatService: ChatService,
    private chatCommunicationService: ChatCommunicationService,
    private webSocketService: WebSocketService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadChatRooms();
    this.subscription = this.chatCommunicationService.sendMessage$.subscribe(chatMessage => {
      if(this.selectedRoom.recipientId === chatMessage.senderId)
        this.addMessage(chatMessage);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get userId(): number {
    return this.authService.getUserId();
  }

  selectRoom(id: number): void {
    if(this.selectedRoom.id === id) {
      return;
    }
    this.selectedRoom = this.chatRooms.find(room => room.id === id);
    this.loadMessages();
  }

  sendMessage(): void {
    if(this.newMessage.trim().length === 0) {
      return;
    }
    this.addMessage({
      message: this.newMessage,
      recipientId: this.selectedRoom.recipientId,
      senderId: this.userId
    });
    const request = this.getRequest();
    this.webSocketService.sendMessage(request);
    this.newMessage = "";
  }

  private loadChatRooms(): void {
    this.service.getChatRooms().subscribe({
      next: (chatRooms: ChatRoom[]) => {
        if(chatRooms.length > 0) {
          this.selectedRoom = chatRooms[0];
          this.chatRooms = chatRooms;
          this.loadMessages();
        }
      },
      error: (_) => {
        this.chatRooms = [];
      }
    });
  }

  private loadMessages() {
    this.chatService.getMessages(this.userId, this.selectedRoom.recipientId).subscribe({
      next: (messages: ChatMessage[]) => {
        this.messages = messages;
      }
    });
  }

  private getRequest(): ChatMessageRequestDto {
    return {
      senderId: this.userId,
      recipientId: this.selectedRoom.recipientId,
      message: this.newMessage
    };
  }

  private addMessage(message: ChatMessage) {
    this.selectedRoom.lastMessage = message.message;
    this.messages.push(message);
  }
}
