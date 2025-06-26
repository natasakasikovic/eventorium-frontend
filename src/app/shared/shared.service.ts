import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from './model/city.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private httpClient: HttpClient) { }

  getCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(`${environment.apiHost}/cities/all`)
  }
}
