import {Category} from '../../category/model/category.model';

export interface BudgetItem {
  plannedAmount: number;
  itemId: number;
  category: Category;
}
