import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import { BudgetPlanningComponent } from './budget-planning/budget-planning.component';
import {MatTabGroup} from '@angular/material/tabs';
import { BudgetItemsComponent } from './budget-items/budget-items.component';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [
    BudgetPlanningComponent,
    BudgetItemsComponent
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
