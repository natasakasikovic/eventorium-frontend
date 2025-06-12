import {Category} from '../../category/model/category.model';

export interface BudgetItemRequest {
  plannedAmount: number;
  category: Category;
  itemId: number;
}
