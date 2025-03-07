import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {ChatMessage} from '../web-socket/model/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatCommunicationService {
  private sendMessageSource = new Subject<ChatMessage>();
  sendMessage$ = this.sendMessageSource.asObservable();

  sendMessage(chatMessage: ChatMessage) {
    this.sendMessageSource.next(chatMessage);
  }

  constructor() { }
}
