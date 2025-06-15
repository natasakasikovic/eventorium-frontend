import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Role } from '../model/user-role.model';
import { toString } from '../model/user-role.model';
import { UpgradeAccountRequest } from '../../user/model/upgrade-account-request.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { AuthResponse } from '../model/auth-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upgrade-account',
  templateUrl: './upgrade-account.component.html',
  styleUrl: './upgrade-account.component.css'
})
export class UpgradeAccountComponent implements OnInit {
  upgradeForm: FormGroup;
  roles: Role[];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.upgradeForm = this.fb.group({
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^(\\+)?[0-9]{9,15}$')]],
      role: ['', Validators.required],
    })
    this.getRoles();
  }

  getRoles(): void {
    this.authService.getRegistrationOptions().subscribe(roles => this.roles = roles);
  }

  roleToString(role: Role): string {
    return toString(role);
  }

  onSubmit() {
    if (!this.upgradeForm.valid) return;

    const request: UpgradeAccountRequest = this.upgradeForm.value;
    this.authService.upgradeAccount(request).subscribe({
      next: (res: AuthResponse) => {
        this.authService.updateSession(res);
        if (request.role.name == 'PROVIDER')
          void this.router.navigate([`${this.authService.getUserId()}/company-register`])
        
      }, 
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }

  handleError(error: HttpErrorResponse): void {
    if (error.status >= 500)
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.SERVER_ERROR);
    else
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, error.error.message);
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: { title: title, message: message }
    })
  }
  
}
