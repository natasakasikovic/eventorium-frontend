import {Category} from '../../category/model/category.model';
import {SolutionType} from './solution-type.enum';
import {BudgetItemStatus} from './budget-item-status.enum';

export interface BudgetItem {
  plannedAmount: number;
  spentAmount: number;
  solutionId: number;
  solutionName: string;
  status: BudgetItemStatus;
  type: SolutionType;
  category: Category;
}
