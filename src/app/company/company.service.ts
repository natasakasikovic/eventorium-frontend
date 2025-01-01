import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { CompanyRequest } from './model/company-request.model';
import { CompanyResponse } from './model/company-response.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  createCompany(company: CompanyRequest): Observable<CompanyResponse> {
    return this.http.post<CompanyResponse>(`${environment.apiHost}/companies`, company)
  }
}
