import {Recipient} from './chat-user.model';

export interface ChatMessage {
  senderId: number;
  recipientId: number;
  message: string;
  sender?: Recipient;
}
