import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../auth/login/login.component';
import { MatSidenav } from '@angular/material/sidenav';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input() drawer!: MatSidenav;
  @Input() isLoggedIn: boolean = false; 

  constructor(private dialog: MatDialog, private router: Router, private authService: AuthService) {}

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
    // this.router.navigate(['/home'], { replaceUrl: true }); 
    this.router.navigate([''])
    this.authService.logout();
  }
}
