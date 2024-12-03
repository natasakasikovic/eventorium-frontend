import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventTypeComponent } from './create-event-type/create-event-type.component';
import { MaterialModule } from '../infrastructure/material/material.module';

@NgModule({
  declarations: [
    CreateEventTypeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class EventTypeModule { }
