import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { MaterialModule } from '../infrastructure/material/material.module';


@NgModule({
  declarations: [
    AccountDetailsComponent
  ],
  imports: [
    CommonModule, MaterialModule
  ]
})
export class UserModule { }
