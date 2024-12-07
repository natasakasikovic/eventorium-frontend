import {Injectable, OnInit} from '@angular/core';
import {Service} from './model/service.model';
import {ServiceFilter} from './model/filter-service-options.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedResponse } from '../shared/model/paged-response.model';
import { environment } from '../../env/environment';
import { Observable } from 'rxjs';

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

  // TODO: connect to backend methods below

  getTopServices(): Service[] {
    return this.services.slice(0, 5);
  }

  update(id: number, service: Service): void {
    const oldService: Service = this.get(id);
    oldService.visible = service.visible;
    oldService.name = service.name;
    oldService.price = service.price;
    oldService.confirmation = service.confirmation;
    oldService.available = service.available;
    oldService.cancellationDeadline = service.cancellationDeadline;
    oldService.specialties = service.specialties;
    oldService.description = service.description;
    oldService.minDuration = service.minDuration;
    oldService.maxDuration = service.maxDuration;
    oldService.discount = service.discount;
  }

  create(service: Service): void {
    this.services.push(service);
  }

  get(id: number): Service {
    return this.services.find(service => service.id === id);
  }

  delete(id: number): void {
    this.services = this.services.filter(service => service.id !== id);
  }

  filterServices(serviceFilter: ServiceFilter): Service[] {
    return this.services.filter(service => {
      if (serviceFilter.category && service.categoryName !== serviceFilter.category) return false;
      if (serviceFilter.eventType && serviceFilter.eventType in service.eventTypes) return false;
      if (serviceFilter.available !== null && serviceFilter.available !== undefined
        && (service.available == false && serviceFilter.available == true)) return false;
      if (serviceFilter.minPrice !== null && serviceFilter.minPrice !== undefined
        && service.price < serviceFilter.minPrice) return false;
      return !(serviceFilter.maxPrice !== null && serviceFilter.maxPrice !== undefined
        && service.price > serviceFilter.maxPrice);
    });
  }

  searchServices(keyword: string): Service[] {
    return this.services.filter(service => service.name.toLowerCase().includes(keyword.toLowerCase()));
  }

}
