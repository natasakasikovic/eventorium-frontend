import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications/notifications.component';
import { MaterialModule } from '../infrastructure/material/material.module';



@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class WebSocketModule { }
