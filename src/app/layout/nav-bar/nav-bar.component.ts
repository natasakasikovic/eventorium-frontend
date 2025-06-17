import {Component, Input, OnInit} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import {WebSocketService} from '../../web-socket/web-socket-service';
import {NotificationService} from '../../web-socket/notification.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() drawer!: MatSidenav;
  @Input() isLoggedIn: boolean = false;
  role: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private webSocketService: WebSocketService,
    private notificationService: NotificationService
  ) { }

  get silenceStatus(): boolean {
    return this.webSocketService.silenceStatus;
  }

  ngOnInit(): void {
    this.authService.userState.subscribe((result) => {
      this.role = result;
    });
    this.notificationService.getSilenceStatus().subscribe(status => {
      this.webSocketService.silenceStatus = status;
    });
  }

  logOut(): void {
    this.webSocketService.closeSocket();
    this.authService.logout();
    void this.router.navigate(['home']);
  }


  silenceNotifications(): void {
    this.notificationService.updateSilence(!this.webSocketService.silenceStatus).subscribe(_ => {
      this.webSocketService.silenceStatus = !this.webSocketService.silenceStatus;
    });
  }
}
