import {Component, Input, OnInit} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import {WebSocketService} from '../../web-socket/web-socket-service';
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
    private webSocketService: WebSocketService
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
    this.webSocketService.closeSocket();
    this.authService.logout();
    void this.router.navigate(['home']);
  }

  signup(): void {
    void this.router.navigate(['signup']);
  }

  createEvent(): void {
    void this.router.navigate(['create-event']);
  }

  createCategory() {
    void this.router.navigate(['create-category']);
  }

  createEventType() {
    void this.router.navigate(['create-event-type']);
  }

  createService() {
    void this.router.navigate(['create-service']);
  }

  createProduct() {
    // TODO: change when implemented
  }
}
