import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../auth/login/login.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input() isLoggedIn: boolean = false; 

  constructor(private dialog: MatDialog) {}

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '450px',
      height: 'auto',
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.componentInstance.loginStatusChanged.subscribe((status: boolean) => {
      this.isLoggedIn = status;
      if (status) {
        dialogRef.close();
      }
    });
  }

  logout(): void {
    this.isLoggedIn = false;
    sessionStorage.removeItem('currentUser');
  }
}
