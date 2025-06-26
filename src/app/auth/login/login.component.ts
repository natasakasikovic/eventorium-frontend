import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponse } from '../model/auth-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import {WebSocketService} from '../../web-socket/web-socket-service';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';

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
          if (error.status >= 500)
            this.serverError = ERROR_MESSAGES.SERVER_ERROR;
          else
            this.serverError = error.error.message;
        }
      });
    }
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

}
