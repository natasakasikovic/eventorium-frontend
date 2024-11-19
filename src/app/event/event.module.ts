import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopFiveEventsComponent } from './top-five-events/top-five-events.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../infrastructure/material/material.module';



@NgModule({
  declarations: [
    TopFiveEventsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    TopFiveEventsComponent
  ]
})
export class EventModule { }
