import {UserDetails} from '../../user/model/user-details.model';
import {SolutionReview} from './solution-review.model';

export interface Review {
  id: number;
  rating: number;
  feedback: string;
  creationDate: Date;
  user: UserDetails
  solution: SolutionReview
}
