import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Review} from '../shared/model/review.model';
import {Observable} from 'rxjs';
import {environment} from '../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpClient: HttpClient) { }

  createProductReview(id: number, review: Review): Observable<Review> {
    return this.httpClient.post<Review>(`${environment.apiHost}/products/${id}/reviews`, review);
  }

}
