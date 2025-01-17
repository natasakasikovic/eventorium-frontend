import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { CompanyRequest } from './model/company-request.model';
import { CompanyResponse } from './model/company-response.model';
import { ProviderCompany } from './model/provider-company.model';
import { ImageResponseDto } from '../shared/model/image-response-dto.model';
import { RemoveImageRequest } from '../shared/model/remove-image-request.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  createCompany(company: CompanyRequest): Observable<CompanyResponse> {
    return this.http.post<CompanyResponse>(`${environment.apiHost}/companies`, company);
  }

  uploadImages(companyId: number, images: File[]): Observable<void> {
    const formData: FormData = new FormData();

    images.forEach(image => {
      formData.append('images', image, image.name);
    });
    
    return this.http.post<void>(
      `${environment.apiHost}/companies/${companyId}/images`,
      formData,
      { responseType: 'text' as 'json' }
    );
  }

  getCompany(): Observable<ProviderCompany> {
    return this.http.get<ProviderCompany>(`${environment.apiHost}/companies/my-company`);
  }

  getImages(id: number) : Observable<ImageResponseDto[]> {
    return this.http.get<ImageResponseDto[]>(`${environment.apiHost}/companies/${id}/images`);
  }

  updateCompany(company: ProviderCompany): Observable<CompanyResponse> {
    return this.http.put<CompanyResponse>(`${environment.apiHost}/companies`, company);
  }

  removeImages(removedImages: RemoveImageRequest[]): Observable<void> {
    return this.http.delete<void>(`${environment.apiHost}/companies/images`, { body: removedImages });
  }
}
