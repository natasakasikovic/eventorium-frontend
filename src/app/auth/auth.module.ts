import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { UserRegisterComponent } from './user-register/user-register.component';
import { QuickRegistrationComponent } from './quick-registration/quick-registration.component';
import { UpgradeAccountComponent } from './upgrade-account/upgrade-account.component';

@NgModule({
  declarations: [
    LoginComponent,
    UserRegisterComponent,
    QuickRegistrationComponent,
    UpgradeAccountComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    LoginComponent, UserRegisterComponent
  ]
})
export class AuthModule { }
