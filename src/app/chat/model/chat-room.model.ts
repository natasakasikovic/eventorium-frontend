export interface ChatRoom {
  id: number;
  displayName: string;
  timestamp: Date;
  lastMessage: string;
  recipientId: number;
}
