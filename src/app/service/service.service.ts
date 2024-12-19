import {Injectable, OnInit} from '@angular/core';
import {Service} from './model/service.model';
import {ServiceFilter} from './model/filter-service-options.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedResponse } from '../shared/model/paged-response.model';
import { environment } from '../../env/environment';
import { Observable } from 'rxjs';
import {CreateServiceRequestDto} from './model/create-service-dto.model';
import {ImageResponseDto} from '../shared/model/image-response-dto.model';
import {Event} from '../event/model/event.model';
import {COMMA} from '@angular/cdk/keycodes';
import {PageProperties} from '../shared/model/page-properties.model';
import {UpdateServiceRequestDto} from './model/update-service-request-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private services: Service[] = []

  constructor(private httpClient: HttpClient) { }

  getAll(pageProperties? : any): Observable<PagedResponse<Service>> {
    let params = new HttpParams();
    if (pageProperties){
      params = params
      .set('page', pageProperties.pageIndex)
      .set('size', pageProperties.pageSize)
    }
    return this.httpClient.get<PagedResponse<Service>>(environment.apiHost + "/services", { params: params });
  }

  getTopServices(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(environment.apiHost + "/services/top-five-services");
  }

  update(id: number, service: UpdateServiceRequestDto): Observable<Service> {
    console.log(service);
    return this.httpClient.put<Service>(`${environment.apiHost}/services/${id}`, service);
  }

  create(service: CreateServiceRequestDto): Observable<Service> {
    return this.httpClient.post<Service>(`${environment.apiHost}/services`, service);
  }

  get(id: number): Observable<Service> {
    return this.httpClient.get<Service>(`${environment.apiHost}/services/${id}`);
  }

  delete(id: number): void {
    this.services = this.services.filter(service => service.id !== id);
  }

  filterServices(serviceFilter: ServiceFilter): Service[] {
    return null;
  }

  searchServices(keyword: string): Service[] {
    return this.services.filter(service => service.name.toLowerCase().includes(keyword.toLowerCase()));
  }

  uploadFiles(serviceId: number, files: File[]): Observable<string> {
    const formData: FormData = new FormData();

    files.forEach(file => {
      formData.append('images', file, file.name);
    });

    return this.httpClient.post<string>(
      `${environment.apiHost}/services/${serviceId}/images`,
      formData,
      { responseType: 'text' as 'json' }
    );
  }

  getImages(id: number): Observable<ImageResponseDto[]> {
    return this.httpClient.get<ImageResponseDto[]>(
      `${environment.apiHost}/services/${id}/images`,
    );
  }

  getImage(id: number): Observable<Blob> {
    return this.httpClient.get(
      `${environment.apiHost}/services/${id}/image`,
      { responseType: 'blob' }
    ) as Observable<Blob>;
  }

  getBudgetSuggestions(id: number, price: number): Observable<Service[]> {
    return this.httpClient.get<Service[]>(
      `${environment.apiHost}/services/suggestions`,
      { params: new HttpParams().set('categoryId', id).set('price', price) }
    );
  }

  filterProviderServices(filter: ServiceFilter, pageProperties?: PageProperties): Observable<PagedResponse<Service>> {
    let params = new HttpParams()
    if (pageProperties){
      params = this.getFilterParams(filter, pageProperties)
    }
    return this.httpClient.get<PagedResponse<Service>>(
      `${environment.apiHost}/account/services/filter`,
      { params: params }
    );
  }

  searchProviderServices(keyword: string, pageProperties?: PageProperties): Observable<PagedResponse<Service>> {
    let params = new HttpParams()
    if (pageProperties){
      params = params
        .set('keyword', keyword)
        .set('page', pageProperties.pageIndex)
        .set('size', pageProperties.pageSize);
    }
    return this.httpClient.get<PagedResponse<Service>>(environment.apiHost + "/account/services/search", {params: params})
  }

  getAllForProvider(pageProperties?: any, filter?: ServiceFilter): Observable<PagedResponse<Service>> {
    let params = new HttpParams();
    if(filter) {
      params = this.getFilterParams(filter, pageProperties);
      return this.httpClient.get<PagedResponse<Service>>(environment.apiHost + "/account/services/filter", { params: params });
    }

    params = params
      .set('page', pageProperties.pageIndex)
      .set('size', pageProperties.pageSize)
    return this.httpClient.get<PagedResponse<Service>>(environment.apiHost + "/account/services", { params: params });
  }

  private getFilterParams(filter?: ServiceFilter, pageProperties?: PageProperties): HttpParams {
    return new HttpParams()
      .set('category', filter.category || '')
      .set('eventType', filter.eventType || '')
      .set('availability', filter.available != null ? filter.available.toString() : '')
      .set('minPrice', filter.minPrice != null ? filter.minPrice.toString() : '')
      .set('maxPrice', filter.maxPrice != null ? filter.maxPrice.toString() : '')
      .set('page', pageProperties.pageIndex)
      .set('size', pageProperties.pageSize)
  }
}
