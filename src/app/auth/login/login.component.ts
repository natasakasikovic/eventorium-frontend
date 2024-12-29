import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponse } from '../model/auth-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import {WebSocketService} from '../../notification/web-socket-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  serverError: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: WebSocketService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })


  login(): void {
    if (this.loginForm.valid) {
      const login: Login = {
        email: this.loginForm.value.email || "",
        password: this.loginForm.value.password || ""
      };
      this.authService.login(login).subscribe({
        next: (response: AuthResponse) => {
          localStorage.setItem('user', response.jwt);
          this.authService.setUser();
          this.notificationService.openSocket();
          void this.router.navigate(['home']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.serverError = 'Invalid credentials. Please try again.';
          } else if (error.status === 403) {
            this.serverError = 'Account is not verified. Check your email.'
          } else {
            this.serverError = 'An error occurred. Please try again later.';
          }
        }
      });
    }
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

}
