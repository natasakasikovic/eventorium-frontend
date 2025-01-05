import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { EditAccountComponent } from './edit-account/edit-account.component';


@NgModule({
  declarations: [
    AccountDetailsComponent,
    EditAccountComponent
  ],
  imports: [
    CommonModule, MaterialModule
  ]
})
export class UserModule { }
