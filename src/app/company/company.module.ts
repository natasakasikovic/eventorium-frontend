import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRegisterComponent } from './company-register/company-register.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { ProviderCompanyComponent } from './provider-company/provider-company.component';

@NgModule({
  declarations: [
    CompanyRegisterComponent,
    ProviderCompanyComponent
  ],
  imports: [
    CommonModule, MaterialModule
  ],
  exports: [
    CompanyRegisterComponent
  ]
})
export class CompanyModule { }
