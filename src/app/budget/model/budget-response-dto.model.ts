import {BudgetItem} from './budget-item.model';

export interface BudgetResponseDto {
  id: number,
  totalBudget: number;
  totalPlannedBudget: number;
  items: BudgetItem[];
}
