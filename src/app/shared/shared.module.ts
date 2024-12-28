import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { EventCardComponent } from './event-card/event-card.component';
import {ServiceCardComponent} from './service-card/service-card.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {ServiceFilterComponent} from './service-filter/service-filter.component';
import {RouterLink} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { EventSelectionComponent } from './event-selection/event-selection.component';


@NgModule({
  declarations: [
    ProductCardComponent,
    EventCardComponent,
    ServiceCardComponent,
    SearchBarComponent,
    ServiceFilterComponent,
    InfoDialogComponent,
    EventSelectionComponent
    ],  
  imports: [
    CommonModule,
    MaterialModule,
    RouterLink,
    ReactiveFormsModule
  ],
  exports: [
    ServiceCardComponent,
    SearchBarComponent,
    ServiceFilterComponent,
    ProductCardComponent,
    EventCardComponent
  ]
})
export class SharedModule { }
