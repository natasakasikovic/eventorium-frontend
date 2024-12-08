import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponse } from '../model/auth-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() loginStatusChanged = new EventEmitter<boolean>();

  constructor(private dialogRef: MatDialogRef<LoginComponent>, private authService: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })


  login(): void {
    if (this.loginForm.valid) {
      const login: Login = {
        email: this.loginForm.value.email || "",
        password: this.loginForm.value.password || ""
      }
      this.authService.login(login).subscribe({
        next: (response: AuthResponse) => {
          localStorage.setItem('user', response.jwt);
          this.authService.setUser()
          this.loginStatusChanged.emit(true);
          this.dialogRef.close();
          this.router.navigate(['home'])
        }
      })
    }
  }

  navigateToSignup() {
    this.dialogRef.close();
    this.router.navigate(['/signup']);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
