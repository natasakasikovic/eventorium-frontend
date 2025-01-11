import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRegisterComponent } from './company-register/company-register.component';
import { MaterialModule } from '../infrastructure/material/material.module';

@NgModule({
  declarations: [
    CompanyRegisterComponent
  ],
  imports: [
    CommonModule, MaterialModule
  ],
  exports: [
    CompanyRegisterComponent
  ]
})
export class CompanyModule { }
