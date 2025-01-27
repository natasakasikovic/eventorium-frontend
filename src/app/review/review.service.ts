import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Review} from './model/review.model';
import {Observable} from 'rxjs';
import {environment} from '../../env/environment';
import {CreateReview} from './model/create-review.model';
import {Status} from '../category/model/status-enum-ts';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpClient: HttpClient) { }

  createProductReview(id: number, review: CreateReview): Observable<Review> {
    return this.httpClient.post<Review>(`${environment.apiHost}/products/${id}/reviews`, review);
  }

  getPendingReviews(): Observable<Review[]> {
    return this.httpClient.get<Review[]>(`${environment.apiHost}/reviews/pending/all`);
  }

  updateReview(id: number, status: Status): Observable<Review> {
    return this.httpClient.patch<Review>(`${environment.apiHost}/reviews/${id}`, { status: status });
  }
}
