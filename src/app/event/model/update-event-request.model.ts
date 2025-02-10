import { EventType } from "../../event-type/model/event-type.model";
import { City } from "../../shared/model/city.model";

export interface UpdateEventRequest {
    name: string;
    description: string;
    date: Date;
    maxParticipants: number;
    eventType: EventType | null;
    city: City;
    address: string;
}