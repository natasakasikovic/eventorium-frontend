import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventTypeComponent } from './create-event-type/create-event-type.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { EditEventTypeComponent } from './edit-event-type/edit-event-type.component';

@NgModule({
  declarations: [
    CreateEventTypeComponent,
    EditEventTypeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class EventTypeModule { }
