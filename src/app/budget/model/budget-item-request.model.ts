import {Category} from '../../category/model/category.model';
import {SolutionType} from './solution-type.enum';

export interface BudgetItemRequest {
  plannedAmount: number;
  category: Category;
  itemId: number;
  itemType: SolutionType;
}
