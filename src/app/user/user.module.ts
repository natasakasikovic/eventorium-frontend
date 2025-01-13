import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReportUserDialogComponent } from './report-user-dialog/report-user-dialog.component';
import { ManageReportsComponent } from './manage-reports/manage-reports.component';


@NgModule({
  declarations: [
    AccountDetailsComponent,
    EditAccountComponent,
    ChangePasswordDialogComponent,
    UserProfileComponent,
    ReportUserDialogComponent,
    ManageReportsComponent
  ],
  imports: [
    CommonModule, MaterialModule
  ]
})
export class UserModule { }
