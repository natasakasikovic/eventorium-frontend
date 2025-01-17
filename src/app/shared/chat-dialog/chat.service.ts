import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChatMessage} from '../../web-socket/model/chat-message.model';
import {environment} from '../../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getMessages(senderId: number, recipientId: number): Observable<ChatMessage[]> {
    return this.httpClient.get<ChatMessage[]>(`${environment.apiHost}/messages/${senderId}/${recipientId}`);
  }
}
