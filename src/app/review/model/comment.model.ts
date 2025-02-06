import {UserDetails} from '../../user/model/user-details.model';
import {ReviewType} from './review-type.enum';
import {Commentable} from './commentable.model';

export interface Comment {
  id: number;
  creationDate: Date;
  user: UserDetails;
  type: ReviewType;
  commentable: Commentable;
}
