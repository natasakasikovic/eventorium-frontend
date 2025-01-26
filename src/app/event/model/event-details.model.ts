import {UserDetails} from '../../user/model/user-details.model';

export interface EventDetails {
    name: string;
    description: string;
    eventType: string;
    maxParticipants: string;
    privacy: string;
    address: string;
    city: string;
    date: string;
    organizer: UserDetails;
}
