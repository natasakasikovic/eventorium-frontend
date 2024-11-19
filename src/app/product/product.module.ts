import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../infrastructure/material/material.module';
import { TopFiveProductsComponent } from './top-five-products/top-five-products.component';



@NgModule({
  declarations: [
    TopFiveProductsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    TopFiveProductsComponent
  ]
})
export class ProductModule { }
