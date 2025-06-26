import {SolutionType} from './solution-type.enum';

export interface BudgetSuggestion {
  id: number;
  solutionType: SolutionType;
  name: string;
  price: number;
  discount: number;
  rating: number;
  image: string;
}
