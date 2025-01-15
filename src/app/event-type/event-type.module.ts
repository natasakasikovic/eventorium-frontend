import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventTypeComponent } from './create-event-type/create-event-type.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { EditEventTypeComponent } from './edit-event-type/edit-event-type.component';
import { EventTypesOverviewComponent } from './event-types-overview/event-types-overview.component';
import { EventTypeCardComponent } from './event-type-card/event-type-card.component';

@NgModule({
  declarations: [
    CreateEventTypeComponent,
    EditEventTypeComponent,
    EventTypesOverviewComponent,
    EventTypeCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class EventTypeModule { }
