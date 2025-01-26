import {UserDetails} from '../../user/model/user-details.model';

export interface Review {
  id: number;
  rating: number;
  feedback: string;
  creationDate: Date;
  user: UserDetails
}
