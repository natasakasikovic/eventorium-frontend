import {Category} from '../../category/model/category.model';
import {SolutionType} from './solution-type.enum';

export interface BudgetItem {
  plannedAmount: number;
  spentAmount: number;
  solutionId: number;
  solutionName: string;
  purchased: Date;
  type: SolutionType;
  category: Category;
}
