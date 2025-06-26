import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChatRoom} from './model/chat-room.model';
import {environment} from '../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  constructor(private httpClient: HttpClient) { }

  getChatRooms(): Observable<ChatRoom[]> {
    return this.httpClient.get<ChatRoom[]>(`${environment.apiHost}/chat-rooms/all`);
  }

}
