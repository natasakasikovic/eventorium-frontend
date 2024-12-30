import {Injectable} from '@angular/core';
import Stomp, {Message} from 'stompjs';
import SockJS from 'sockjs-client';
import {environment} from '../../env/environment';
import {AuthService} from '../auth/auth.service';
import {Notification} from './model/notification.model';
import {NotificationType} from './model/notification-type.enum';
import {ToastrService} from 'ngx-toastr';
import {ChatMessageRequestDto} from './model/chat-message-request-dto.model';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socketClient: Stomp.Client = null;
  private notificationSubscription: Stomp.Subscription;
  private adminNotificationSubscription: Stomp.Subscription;
  private chatSubscription: Stomp.Subscription;
  notifications: Notification[] = [];

  constructor(
    private authService: AuthService,
    private toasterService: ToastrService
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

  createChat(id: number): void {
    this.authService.getUserId();
    if(this.socketClient != null) {
      this.socketClient.subscribe(`/queue/messages`);
    }
  }

  sendMessage(message: ChatMessageRequestDto): void {
    this.socketClient.send("/app/chat", {}, JSON.stringify(message));
  }

  private createGlobalSubscriptions(): void {
    const userId = this.authService.getUserId();
    this.notificationSubscription = this.socketClient
      .subscribe(`/user/${userId}/notifications`, (message: Message) => {
        this.handleNotification(JSON.parse(message.body));
      });
    this.chatSubscription = this.socketClient
      .subscribe(`/user/${userId}/queue/messages`, (message: Message) => {
        console.log(JSON.parse(message.body));
      });
  }

  private createAdminSubscriptions(): void {
    this.adminNotificationSubscription = this.socketClient
      .subscribe(`/topic/admin`, (message: Message) => {
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
  }

  private closeAdminSubscriptions(): void {
    this.adminNotificationSubscription.unsubscribe();
  }
}
