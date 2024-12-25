import { Component, Input} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input() drawer!: MatSidenav;
  @Input() isLoggedIn: boolean = false; 
  role: String = null;
  
  constructor(
    private authService: AuthService,
    private router: Router)
  {}

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
    this.router.navigate(['home']);
  }

  signup(): void {
    this.router.navigate(['signup'])
  }
  
  createEvent(): void {
    this.router.navigate(['create-event'])
  }
}
