import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../product/model/product.model';
import {Observable} from 'rxjs';
import {environment} from '../../env/environment';
import {BudgetItem} from './model/budget-item.model';

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
}
