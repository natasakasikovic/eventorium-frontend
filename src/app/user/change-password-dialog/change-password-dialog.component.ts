import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { ChangePasswordRequest } from '../model/change-password-request.model';
import { MESSAGES } from '../../shared/constants/messages';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../shared/validators/password-match.validator';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent {
  changePasswordForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private fb: FormBuilder,
    private service: UserService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) { 
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: passwordMatchValidator(),
      updateOn: 'change'
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  save() : void {
    const request : ChangePasswordRequest = this.changePasswordForm.value;
    console.log(JSON.stringify(request));
    this.service.changePassword(request).subscribe({
      next: () => { 
        this.showMessage(MESSAGES.success, MESSAGES.passwordChanged);
        this.onCancel();
        this.authService.logout();
        this.router.navigate(['login'])
      },
      error: (response: HttpErrorResponse) => {
        if (response.status == 400) {
          this.showMessage("", response.error?.message);
        } else {
          this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, "");
        }
      }
    });
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        message: message
      }
    })
  }
}
