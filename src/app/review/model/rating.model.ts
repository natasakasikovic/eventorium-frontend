import {UserDetails} from '../../user/model/user-details.model';

export interface Rating {
  id: number;
  creationDate: Date;
  rating: number;
  user: UserDetails;
}
