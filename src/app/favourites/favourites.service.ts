import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  constructor(private httpClient: HttpClient) { }

  getFavourites<T>(type: string): Observable<T[]> {
    return this.httpClient.get<T[]>(`${environment.apiHost}/account/${type}/favourites`);
  }
}
