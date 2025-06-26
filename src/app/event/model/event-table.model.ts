import { User } from "../../auth/model/user.model";
import { EventType } from "../../event-type/model/event-type.model";
import { City } from "../../shared/model/city.model";
import { UserDetails } from "../../user/model/user-details.model";

export interface EventTable {
  id: number;
  name: string;
  date: Date;
  privacy: string;
  maxParticipants: number;
  city: City;
}