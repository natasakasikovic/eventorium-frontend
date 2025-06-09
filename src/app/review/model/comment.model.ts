import {UserDetails} from '../../user/model/user-details.model';
import {ReviewType} from './review-type.enum';

export interface Comment {
  id: number;
  comment: string;
  creationDate: Date;
  user: UserDetails;
  type: ReviewType;
  objectId: number;
  displayName: string;
}
