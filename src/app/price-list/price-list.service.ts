import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {PriceListItem} from './model/price-list-item.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../env/environment';
import {PagedResponse} from '../shared/model/paged-response.model';
import {PageProperties} from '../shared/model/page-properties.model';
import {UpdatePriceRequestDto} from './model/update-price-request-dto-model';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getServices(pageProperties: PageProperties): Observable<PagedResponse<PriceListItem>> {
    const params: HttpParams = new HttpParams()
      .set('page', pageProperties.pageIndex)
      .set('size', pageProperties.pageSize);

    return this.httpClient.get<PagedResponse<PriceListItem>>(
      `${environment.apiHost}/price-list/services`,
      { params: params }
    );
  }

  getProducts(pageProperties: PageProperties): Observable<PagedResponse<PriceListItem>> {
    const params: HttpParams = new HttpParams()
      .set('page', pageProperties.pageIndex)
      .set('size', pageProperties.pageSize);

    return this.httpClient.get<PagedResponse<PriceListItem>>(
      `${environment.apiHost}/price-list/products`,
      { params: params}
    );
  }

  updateService(id: number, newPrice: UpdatePriceRequestDto): Observable<PriceListItem> {
    return this.httpClient.patch<PriceListItem>(`${environment.apiHost}/price-list/services/${id}`, newPrice)
  }

  updateProduct(id: number, newPrice: UpdatePriceRequestDto): Observable<PriceListItem> {
    return this.httpClient.patch<PriceListItem>(`${environment.apiHost}/price-list/products/${id}`, newPrice)
  }
}
