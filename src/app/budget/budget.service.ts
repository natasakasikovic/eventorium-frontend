import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Product} from '../product/model/product.model';
import {Observable} from 'rxjs';
import {environment} from '../../env/environment';
import {BudgetItem} from './model/budget-item.model';
import {Budget} from './model/budget.model';
import {ReviewableSolution} from '../review/model/reviewable-solution.model';
import {BudgetItemRequest} from './model/budget-item-request.model';
import {BudgetSuggestion} from './model/budget-suggestion.model';

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

  getBudgetSuggestions(eventId: number, categoryId: number, price: number): Observable<BudgetSuggestion[]> {
    const params = new HttpParams().set("category-id", categoryId).set("price", price);
    return this.httpClient.get<BudgetSuggestion[]>(`${environment.apiHost}/events/${eventId}/budget/suggestions`, { params });
  }

  updateBudgetItem(eventId: number, item: BudgetItem): Observable<BudgetItem> {
    return this.httpClient.patch<BudgetItem>(
      `${environment.apiHost}/events/${eventId}/budget/budget-items/${item.id}`,
      { plannedAmount: item.plannedAmount }
    )
  }

  createBudgetItem(eventId: number, request: BudgetItemRequest): Observable<BudgetItem> {
    return this.httpClient.post<BudgetItem>(`${environment.apiHost}/events/${eventId}/budget/budget-items`, request);
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
