import {ReviewType} from './review-type.enum';

export interface CreateComment {
  comment: string;
  objectId: number;
  type: ReviewType;
}
