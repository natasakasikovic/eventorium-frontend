import {Recipient} from '../../web-socket/model/chat-user.model';

export interface EventDetails {
    name: string;
    description: string;
    eventType: string;
    maxParticipants: string;
    privacy: string;
    address: string;
    city: string;
    date: string;
    organizer: Recipient;
}
