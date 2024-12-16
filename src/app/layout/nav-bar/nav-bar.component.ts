import { Component, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../auth/login/login.component';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserRole } from '../../auth/model/user-role.enum';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input() drawer!: MatSidenav;
  @Input() isLoggedIn: boolean = false; 
  role: String = null;
  
  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {
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
      }
    });
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['home']);
  }

  signup(): void {
    this.router.navigate(['signup'])
  }

  get isOrganizer(): boolean {
    return this.role === UserRole.EVENT_ORGANIZER;
  }

  createEvent(): void {
    this.router.navigate(['create-event'])
  }
}
