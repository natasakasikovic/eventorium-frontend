import {Injectable} from '@angular/core';
import Stomp, {Message} from 'stompjs';
import SockJS from 'sockjs-client';
import {environment} from '../../env/environment';
import {AuthService} from '../auth/auth.service';
import {Notification} from './model/notification.model';
import {NotificationType} from './model/notification-type.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  socketClient: Stomp.Client = null;
  private notificationSubscription: Stomp.Subscription;
  notifications: Notification[] = [];

  constructor(
    private authService: AuthService
  ) { }

  openSocket(): void {
    let ws = new SockJS(`${environment.apiHost}/ws`);
    this.socketClient = Stomp.over(ws);

    this.socketClient.connect({'Authorization': 'Bearer ' + localStorage.getItem('user') }, () => {
      this.notificationSubscription = this.socketClient
        .subscribe(`/user/${this.authService.getUserId()}/notifications`, (message: Message) => {
          const notification: Notification = JSON.parse(message.body);
          if(notification) {
            this.notifications.unshift(notification);
            if(notification.type == NotificationType.ACCEPTED) {

            }
          }
        })
    });
  }

  closeSocket(): void {
    if (this.socketClient) {
      this.socketClient.disconnect(() => {
        console.log("Disconnected from WS");
      });
      this.socketClient = null;
    }
  }

}
