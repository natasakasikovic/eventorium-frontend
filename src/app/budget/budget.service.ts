import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../product/model/product.model';
import {Observable} from 'rxjs';
import {environment} from '../../env/environment';
import {BudgetItem} from './model/budget-item.model';
import {Budget} from './model/budget.model';
import {ReviewableSolution} from '../review/model/reviewable-solution.model';
import {BudgetItemRequest} from './model/budget-item-request.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(
    private httpClient: HttpClient
  ) { }

  purchase(id: number, item: BudgetItemRequest): Observable<Product> {
    return this.httpClient.post<Product>(`${environment.apiHost}/events/${id}/budget/purchase`, item);
  }


  getBudget(id: number): Observable<Budget> {
    return this.httpClient.get<Budget>(`${environment.apiHost}/events/${id}/budget`);
  }

  getAllBudgetItems(): Observable<ReviewableSolution[]> {
    return this.httpClient.get<ReviewableSolution[]>(`${environment.apiHost}/budget-items`);
  }

  getBudgetItems(eventId: number): Observable<BudgetItem[]> {
    return this.httpClient.get<BudgetItem[]>(`${environment.apiHost}/events/${eventId}/budget/budget-items`)
  }
}
