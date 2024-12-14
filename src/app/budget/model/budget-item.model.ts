import {Service} from '../../service/model/service.model';
import {Product} from '../../product/model/product.model';
import {Category} from '../../category/model/category.model';

export interface BudgetItem {
  plannedAmount: number,
  item: Product | Service;
  purchased: Date;
  category: Category;
}
