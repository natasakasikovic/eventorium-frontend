import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../model/user.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = {
    email: '',
    password: '' 
  };
  loginMessage: string | null = null;

  @Output() loginStatusChanged = new EventEmitter<boolean>();

  constructor(private dialogRef: MatDialogRef<LoginComponent>, private authService: AuthService, private router: Router) {}

  login(): void {
    const loginResponse = this.authService.login(this.user.email, this.user.password);
  
    if (typeof loginResponse === 'string') {
      this.loginMessage = loginResponse;
      this.loginStatusChanged.emit(false);
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(loginResponse)); 
      this.loginStatusChanged.emit(true);
      this.dialogRef.close();
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
