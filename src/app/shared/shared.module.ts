import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { MaterialModule } from '../infrastructure/material/material.module';



@NgModule({
  declarations: [
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ProductCardComponent
  ]
})
export class SharedModule { }
