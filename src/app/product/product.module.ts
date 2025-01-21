import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../infrastructure/material/material.module';
import { TopFiveProductsComponent } from './top-five-products/top-five-products.component';
import { ProductsOverviewComponent } from './products-overview/products-overview.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsFilterDialogComponent } from './products-filter-dialog/products-filter-dialog.component';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    TopFiveProductsComponent,
    ProductsOverviewComponent,
    ProductDetailsComponent,
    ProductsFilterDialogComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        RouterLink
    ],
  exports: [
    TopFiveProductsComponent,
    ProductsOverviewComponent,
    ProductDetailsComponent
  ]
})
export class ProductModule { }
