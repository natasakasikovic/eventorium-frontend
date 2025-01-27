import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../web-socket-service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { NotificationResponse } from './notifications-response.model';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})

export class NotificationsComponent implements OnInit {

  notifications: NotificationResponse[];
  
  constructor( private service: WebSocketService, private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  private loadNotifications(): void {
    this.service.getNotifications().subscribe({
      next: (notifications: NotificationResponse[]) => {
        this.notifications = notifications;
        this.markNotificationsAsSeen()},
      error: () => this.showServerError()
    });
  }
  private markNotificationsAsSeen(): void {
    this.service.markAsSeen().subscribe({
      next: () => { },
      error: () => this.showServerError()
    });
  }
  private showServerError() : void {
    this.dialog.open(InfoDialogComponent, {
      data: { title: ERROR_MESSAGES.GENERAL_ERROR, data: ERROR_MESSAGES.SERVER_ERROR }
    })
  }
}