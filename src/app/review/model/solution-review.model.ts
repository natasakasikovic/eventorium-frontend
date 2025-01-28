import {SolutionType} from './solution-type.enum';

export interface SolutionReview {
  id: number;
  name: string;
  solutionType: SolutionType;
}
