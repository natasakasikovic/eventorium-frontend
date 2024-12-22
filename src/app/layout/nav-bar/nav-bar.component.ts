import {Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../auth/login/login.component';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import SockJS from 'sockjs-client';
import {environment} from '../../../env/environment';
import Stomp from 'stompjs';
import {NotificationService} from '../../notification/notification.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() drawer!: MatSidenav;
  @Input() isLoggedIn: boolean = false;
  role: String = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.authService.userState.subscribe((result) => {
      this.role = result;
    })
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '450px',
      height: 'auto',
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.componentInstance.loginStatusChanged.subscribe((status: boolean) => {
      if (status) {
        dialogRef.close();
        this.notificationService.openSocket();
      }
    });
  }

  logOut(): void {
    this.authService.logout();
    this.notificationService.closeSocket();
    void this.router.navigate(['home']);
  }

  signup(): void {
    this.router.navigate(['signup'])
  }

  createEvent(): void {
    this.router.navigate(['create-event'])
  }
}
