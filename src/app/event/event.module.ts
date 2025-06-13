import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopFiveEventsComponent } from './top-five-events/top-five-events.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../infrastructure/material/material.module';
import { EventsOverviewComponent } from './events-overview/events-overview.component';
import { EventInvitationsComponent } from './event-invitations/event-invitations.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventAgendaComponent } from './event-agenda/event-agenda.component';
import { EventsFilterDialogComponent } from './events-filter-dialog/events-filter-dialog.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { UserInvitationsComponent } from './user-invitations/user-invitations.component';
import { InvitationCardComponent } from './invitation-card/invitation-card.component';
import { ManageableEventsComponent } from './manageable-events/manageable-events.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { PastEventsOverviewComponent } from './past-events-overview/past-events-overview.component';
import { EventRatingStatisticsComponent } from './event-rating-statistics/event-rating-statistics.component';
import { EventMapComponent } from './event-map/event-map.component';

@NgModule({
  declarations: [
    TopFiveEventsComponent,
    EventsOverviewComponent,    
    EventInvitationsComponent,
    CreateEventComponent,
    EventAgendaComponent,
    EventsFilterDialogComponent,
    EventDetailsComponent,
    UserInvitationsComponent,
    InvitationCardComponent,
    ManageableEventsComponent,
    EditEventComponent,
    PastEventsOverviewComponent,
    EventRatingStatisticsComponent,
    EventMapComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    TopFiveEventsComponent,
    EventsOverviewComponent,
    EventInvitationsComponent
  ]
})
export class EventModule { }
