import { Component, ChangeDetectorRef, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './auth/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const currentUser = sessionStorage.getItem('currentUser');
    this.isLoggedIn = currentUser !== null;
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '450px',
      height: 'auto',
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.componentInstance.loginStatusChanged.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.ngZone.run(() => {
      this.isLoggedIn = false;
      this.cdr.detectChanges(); 
    });
  }
}
