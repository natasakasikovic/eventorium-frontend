import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import { BudgetPlanningComponent } from './budget-planning/budget-planning.component';
import { BudgetItemsComponent } from './budget-items/budget-items.component';
import {SharedModule} from '../shared/shared.module';
import { PurchasedAndReservedComponent } from './purchased-and-reserved/purchased-and-reserved.component';



@NgModule({
  declarations: [
    BudgetPlanningComponent,
    BudgetItemsComponent,
    PurchasedAndReservedComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    BudgetPlanningComponent
  ]
})
export class BudgetModule { }
