import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../infrastructure/material/material.module';
import { TopFiveProductsComponent } from './top-five-products/top-five-products.component';
import { ProductsOverviewComponent } from './products-overview/products-overview.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsFilterDialogComponent } from './products-filter-dialog/products-filter-dialog.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { RouterLink } from "@angular/router";
import { ManageableProductsComponent } from './manageable-products/manageable-products.component';
import { ReviewModule } from '../review/review.module';
import { EditProductComponent } from './edit-product/edit-product.component';



@NgModule({
  declarations: [
    TopFiveProductsComponent,
    ProductsOverviewComponent,
    ProductDetailsComponent,
    ProductsFilterDialogComponent,
    CreateProductComponent,
    ManageableProductsComponent,
    EditProductComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        RouterLink,
        ReviewModule
    ],
  exports: [
    TopFiveProductsComponent,
    ProductsOverviewComponent,
    ProductDetailsComponent
  ]
})
export class ProductModule { }
