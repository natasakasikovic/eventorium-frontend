import { Injectable } from '@angular/core';
import {Category} from './model/category.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryRequestDto} from './model/category-request-dto.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  create(category: CategoryRequestDto): Observable<Category> {
    return this.httpClient.post<Category>("http://localhost:8080/api/v1/categories", category);
  }

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>("http://localhost:8080/api/v1/categories/all");
  }

  get(id: number): Category {
    return null;
    // return this.categories.find(category => category.id === id);
  }

  update(id: number, category: CategoryRequestDto): Observable<Category> {
    return this.httpClient.put<Category>(`http://localhost:8080/api/v1/categories/${id}`, category);
  }

  delete(id: number): void {
    // this.categories = this.categories.filter(category => category.id !== id);
  }

  getAllProposals(): Category[] {
   return null; // return this.categories;
  }
}
