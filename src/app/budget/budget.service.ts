import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../product/model/product.model';
import {Observable} from 'rxjs';
import {environment} from '../../env/environment';
import {BudgetItem} from './model/budget-item.model';
import {Budget} from './model/budget.model';
import {Review} from '../review/model/review.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(
    private httpClient: HttpClient
  ) { }

  purchase(id: number, item: BudgetItem): Observable<Product> {
    return this.httpClient.post<Product>(`${environment.apiHost}/events/${id}/budget/purchase`, item);
  }


  getBudget(id: number): Observable<Budget> {
    return this.httpClient.get<Budget>(`${environment.apiHost}/events/${id}/budget`);
  }

  getBudgetItems(): Observable<Review[]> {
    return this.httpClient.get<Review[]>(`${environment.apiHost}/budget-items`);
  }
}
