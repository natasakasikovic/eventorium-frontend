import {Component, Input, OnInit} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import {NotificationService} from '../../notification/notification.service';
import {MatDialog} from '@angular/material/dialog';

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

  login(): void {
    this.router.navigate(['login'])
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
