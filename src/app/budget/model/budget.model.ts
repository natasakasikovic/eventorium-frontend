import {BudgetItem} from './budget-item.model';
import {SolutionType} from '../../review/model/solution-type.enum';

export interface Budget {
  plannedAmount: number;
  spentAmount: number;
  items: BudgetItem[];
}
