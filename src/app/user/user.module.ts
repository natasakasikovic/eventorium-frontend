import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';


@NgModule({
  declarations: [
    AccountDetailsComponent,
    EditAccountComponent,
    ChangePasswordDialogComponent
  ],
  imports: [
    CommonModule, MaterialModule
  ]
})
export class UserModule { }
