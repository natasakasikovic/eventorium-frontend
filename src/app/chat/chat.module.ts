import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import { ChatRoomCardComponent } from './chat-room-card/chat-room-card.component';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [
    ChatRoomCardComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ChatModule { }
