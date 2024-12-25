import { Component, ChangeDetectorRef, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './auth/login/login.component';
import {NavigationService} from './infrastructure/navigation/navigation.service';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {environment} from '../env/environment';
import {NotificationService} from './notification/notification.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  drawer: boolean = false;

  constructor(
    private notificationService: NotificationService,
    private navigation: NavigationService // Need to be here so guards are created properly
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const currentUser = localStorage.getItem('user');
    this.isLoggedIn = currentUser !== null;

    if(this.isLoggedIn) {
      this.notificationService.openSocket();
    }
  }
}
