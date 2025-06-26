import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Rating} from './model/rating.model';
import {environment} from '../../env/environment';
import {ReviewType} from './model/review-type.enum';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private httpClient: HttpClient) { }

  createRating(id: number, type: ReviewType, rating: number): Observable<Rating> {
    return this.httpClient.post<Rating>(`${environment.apiHost}/${type.toLowerCase()}s/${id}/ratings`, {rating: rating});
  }
}
