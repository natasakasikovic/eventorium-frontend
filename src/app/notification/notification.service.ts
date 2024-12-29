import {Injectable} from '@angular/core';
import Stomp, {Message} from 'stompjs';
import SockJS from 'sockjs-client';
import {environment} from '../../env/environment';
import {AuthService} from '../auth/auth.service';
import {Notification} from './model/notification.model';
import {NotificationType} from './model/notification-type.enum';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  socketClient: Stomp.Client = null;
  private notificationSubscription: Stomp.Subscription;
  private adminNotificationSubscription: Stomp.Subscription;
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

  private createGlobalSubscriptions(): void {
    this.notificationSubscription = this.socketClient
      .subscribe(`/user/${this.authService.getUserId()}/notifications`, (message: Message) => {
        this.handleNotification(JSON.parse(message.body));
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
