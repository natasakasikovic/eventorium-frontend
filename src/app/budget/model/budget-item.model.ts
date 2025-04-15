import {Category} from '../../category/model/category.model';
import {SolutionType} from '../../review/model/solution-type.enum';

export interface BudgetItem {
  plannedAmount: number;
  itemId: number;
  category: Category;
  itemType: SolutionType;
}
