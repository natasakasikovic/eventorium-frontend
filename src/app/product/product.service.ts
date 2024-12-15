import { Injectable, OnInit } from '@angular/core';
import { Product } from './model/product.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../env/environment';
import { PagedResponse } from '../shared/model/paged-response.model';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getAll(pageProperties?: any) : Observable<PagedResponse<Product>> { // TODO: see if this should be any
    let params = new HttpParams();
    if (pageProperties){
      params = params
      .set('page', pageProperties.pageIndex)
      .set('size', pageProperties.pageSize)
    }
    return this.httpClient.get<PagedResponse<Product>>(environment.apiHost + "/products", { params: params });
  }

  getTopProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.apiHost + "/products/top-five-products")
  }

  searchProducts(keyword: string, pageProperties?: any): Observable<PagedResponse<Product>> {
    let params = new HttpParams()
    if (pageProperties){
      params = params
      .set('keyword', keyword)
      .set('page', pageProperties.pageIndex)
      .set('size', pageProperties.pageSize)
    }
    return this.httpClient.get<PagedResponse<Product>> (environment.apiHost + "/products/search", {params : params})
  }

  getBudgetSuggestions(id: number, plannedAmount: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${environment.apiHost}/products/suggestions`,
      { params: new HttpParams().set('categoryId', id).set('price', plannedAmount) }
    );
  }
}
