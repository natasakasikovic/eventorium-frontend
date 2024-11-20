import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../infrastructure/material/material.module';
import { TopFiveProductsComponent } from './top-five-products/top-five-products.component';
import { ProductsOverviewComponent } from './products-overview/products-overview.component';



@NgModule({
  declarations: [
    TopFiveProductsComponent,
    ProductsOverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    TopFiveProductsComponent,
    ProductsOverviewComponent
  ]
})
export class ProductModule { }
