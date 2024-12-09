import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopFiveEventsComponent } from './top-five-events/top-five-events.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../infrastructure/material/material.module';
import { EventsOverviewComponent } from './events-overview/events-overview.component';
import { CreateEventComponent } from './create-event/create-event.component';



@NgModule({
  declarations: [
    TopFiveEventsComponent,
    EventsOverviewComponent,
    CreateEventComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    TopFiveEventsComponent,
    EventsOverviewComponent
  ]
})
export class EventModule { }
