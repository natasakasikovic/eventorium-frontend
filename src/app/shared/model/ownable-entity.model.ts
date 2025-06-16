import {UserDetails} from '../../user/model/user-details.model';

export interface OwnableEntity {
  provider?: UserDetails;
  organizer?: UserDetails;
}
