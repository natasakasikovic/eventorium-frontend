import { Injectable } from '@angular/core';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {environment} from '../../env/environment';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  socketClient: Stomp.Client = null;
  private notificationSubscription: Stomp.Subscription;

  constructor(
    private authService: AuthService
  ) { }

  openSocket(): void {
    let ws = new SockJS(`${environment.apiHost}/ws`);
    this.socketClient = Stomp.over(ws);

    this.socketClient.connect({'Authorization': 'Bearer ' + localStorage.getItem('user') }, () => {
      this.notificationSubscription = this.socketClient.subscribe(`/user/${this.authService.getUserId()}/notifications`, message => {
        console.log("Message from websocket:", message);
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
