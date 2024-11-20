import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company/company.component';
import { CompanyRegisterComponent } from './company-register/company-register.component';



@NgModule({
  declarations: [
    CompanyComponent,
    CompanyRegisterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CompanyModule { }
