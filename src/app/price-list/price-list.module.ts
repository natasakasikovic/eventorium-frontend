import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceListComponent } from './price-list/price-list.component';
import { PriceListTableComponent } from './price-list-table/price-list-table.component';
import {MatTabGroup} from '@angular/material/tabs';
import {MaterialModule} from '../infrastructure/material/material.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    PriceListComponent,
    PriceListTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class PriceListModule { }
