import {Rating} from './rating.model';
import {ReviewType} from './review-type.enum';

export interface Review {
  id: number;
  name: string;
  price: number;
  discount: number;
  rating: Rating | null;
  type: ReviewType;
}
