import {BudgetItem} from './budget-item.model';

export interface Budget {
  plannedAmount: number;
  spentAmount: number;
  items: BudgetItem[];
}
