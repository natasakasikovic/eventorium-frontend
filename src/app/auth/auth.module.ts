import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { UserRegisterComponent } from './user-register/user-register.component';

@NgModule({
  declarations: [
    LoginComponent,
    UserRegisterComponent
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
