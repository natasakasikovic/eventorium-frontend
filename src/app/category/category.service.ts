import { Injectable } from '@angular/core';
import {Category} from './model/category.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryRequestDto} from './model/category-request-dto.model';
import {environment} from '../../env/environment';
import {Status} from './model/status-enum-ts';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  create(category: CategoryRequestDto): Observable<Category> {
    return this.httpClient.post<Category>(`${environment.apiHost}/categories`, category);
  }

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${environment.apiHost}/categories/all`);
  }

  get(id: number): Observable<Category> {
    return this.httpClient.get<Category>(`${environment.apiHost}/categories/${id}`);
  }

  update(id: number, category: CategoryRequestDto): Observable<Category> {
    return this.httpClient.put<Category>(`${environment.apiHost}/categories/${id}`, category);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiHost}/categories/${id}`);
  }

  getAllProposals(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${environment.apiHost}/categories/pending/all`);
  }

  updateCategoryProposal(id: number, dto: CategoryRequestDto): Observable<Category> {
    return this.httpClient.put<Category>(`${environment.apiHost}/categories/pending/${id}`, dto);
  }
  updateCategoryStatus(id: number, status: Status): Observable<Category> {
    return this.httpClient.patch<Category>(`${environment.apiHost}/categories/pending/${id}`, { status:status });
  }

  changeCategoryProposal(id: number, category: CategoryRequestDto): Observable<Category> {
    return this.httpClient.put<Category>(`${environment.apiHost}/categories/pending/${id}/change`, category);
  }
}
