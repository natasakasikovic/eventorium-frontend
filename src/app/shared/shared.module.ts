import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import {ServiceCardComponent} from './service-card/service-card.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {ServiceFilterComponent} from './service-filter/service-filter.component';
import {RouterLink} from '@angular/router';



@NgModule({
  declarations: [
    ProductCardComponent,
    ServiceCardComponent,
    SearchBarComponent,
    ServiceFilterComponent
  ],
  exports: [
    ServiceCardComponent,
    SearchBarComponent,
    ServiceFilterComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterLink
  ],
})
export class SharedModule { }
