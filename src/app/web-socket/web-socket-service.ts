import {Injectable} from '@angular/core';
import Stomp, {Message} from 'stompjs';
import SockJS from 'sockjs-client';
import {environment} from '../../env/environment';
import {AuthService} from '../auth/auth.service';
import {Notification} from './model/notification.model';
import {NotificationType} from './model/notification-type.enum';
import {ToastrService} from 'ngx-toastr';
import {ChatMessageRequestDto} from './model/chat-message-request-dto.model';
import {ChatMessage} from './model/chat-message.model';
import {ChatDialogService} from '../shared/chat-dialog/chat-dialog.service';
import {Router} from '@angular/router';
import {ChatCommunicationService} from '../chat/chat-communication.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public silenceStatus: boolean;

  socketClient: Stomp.Client = null;
  private notificationSubscription: Stomp.Subscription;
  private adminNotificationSubscription: Stomp.Subscription;
  private chatSubscription: Stomp.Subscription;
  notifications: Notification[] = [];

  constructor(
    private authService: AuthService,
    private toasterService: ToastrService,
    private chatDialog: ChatDialogService,
    private chatCommunicationService: ChatCommunicationService,
    private router: Router,
    ) { }

  openSocket(): void {
    let ws = new SockJS(`${environment.apiHost}/ws`);
    this.socketClient = Stomp.over(ws);

    this.socketClient.connect({}, () => {
      this.createGlobalSubscriptions();
      switch (this.authService.getRole()) {
        case "ADMIN":
          this.createAdminSubscriptions();
          break;
      }
    });
  }

  sendMessage(message: ChatMessageRequestDto): void {
    this.socketClient.send("/app/chat", {}, JSON.stringify(message));
  }

  private createGlobalSubscriptions(): void {
    const userId = this.authService.getUserId();
    this.notificationSubscription = this.socketClient
      .subscribe(`/user/${userId}/notifications`, (message: Message) => {
        if(!this.silenceStatus)
          this.handleNotification(JSON.parse(message.body));
      });
    this.chatSubscription = this.socketClient
      .subscribe(`/user/${userId}/queue/messages`, (message: Message) => {
        this.handleChatMessage(JSON.parse(message.body));
      });
  }

  private createAdminSubscriptions(): void {
    this.adminNotificationSubscription = this.socketClient
      .subscribe(`/topic/admin`, (message: Message) => {
        if(!this.silenceStatus)
          this.handleNotification(JSON.parse(message.body));
      });
  }

  private handleNotification(notification: Notification): void {
    if(notification) {
      this.notifications.unshift(notification);
      switch (notification.type) {
        case NotificationType.SUCCESS:
          this.toasterService.success(notification.message, notification.title);
          break;
        case NotificationType.ERROR:
          this.toasterService.error(notification.message, notification.title);
          break;
        case NotificationType.INFO:
          this.toasterService.info(notification.message, notification.title);
          break;
      }
    }
  }

  private handleChatMessage(chatMessage: ChatMessage): void {
    if(!this.chatDialog.isOpened() && this.router.url !== '/chat') {
      this.chatDialog.openChatDialog(chatMessage.sender);
    } else if (this.router.url !== '/chat'){
      this.chatDialog.sendMessage(chatMessage);
    } else {
      this.chatCommunicationService.sendMessage(chatMessage);
    }
  }

  closeSocket(): void {
    if (this.socketClient !== null) {
      this.socketClient.disconnect(() => console.log("WebSocket disconnected!"));
      this.closeGlobalSubscriptions();
      switch (this.authService.getRole()) {
        case "ADMIN":
          this.closeAdminSubscriptions();
          break;
      }
      this.socketClient = null;
    }
  }

  private closeGlobalSubscriptions(): void {
    this.notificationSubscription.unsubscribe();
    this.chatSubscription.unsubscribe();
  }

  private closeAdminSubscriptions(): void {
    this.adminNotificationSubscription.unsubscribe();
  }
}
