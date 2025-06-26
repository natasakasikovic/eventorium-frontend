import {UserDetails} from '../../user/model/user-details.model';

export interface ChatMessage {
  senderId: number;
  recipientId: number;
  message: string;
  sender?: UserDetails;
}
