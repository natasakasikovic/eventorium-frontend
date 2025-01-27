import { Injectable } from '@angular/core';
import { Product } from './model/product.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../env/environment';
import { PagedResponse } from '../shared/model/paged-response.model';
import { ImageResponseDto } from '../shared/model/image-response-dto.model';
import { ProductFilter } from './model/product-filter.model';
import { PageProperties } from '../shared/model/page-properties.model';
import { CreateProduct } from './model/create-product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private httpClient: HttpClient) { }

  create(product: CreateProduct): Observable<Product> {
    return this.httpClient.post<Product>(`${environment.apiHost}/products`, product);
  }

  uploadImages(id: number, images: File[]): Observable<void> {
    const formData: FormData = new FormData();

    images.forEach(image => {
      formData.append('images', image, image.name);
    });

    return this.httpClient.post<void>(`${environment.apiHost}/products/${id}/images`, formData);
  }

  getAll(pageProperties?: PageProperties) : Observable<PagedResponse<Product>> {
    let params = new HttpParams();
    if (pageProperties){
      params = params
      .set('page', pageProperties.pageIndex)
      .set('size', pageProperties.pageSize)
    }
    return this.httpClient.get<PagedResponse<Product>>(environment.apiHost + "/products", { params: params });
  }

  getTopProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.apiHost + "/products/top-five-products")
  }

  searchProducts(keyword: string, pageProperties?: PageProperties): Observable<PagedResponse<Product>> {
    let params = new HttpParams()
    if (pageProperties){
      params = params
      .set('keyword', keyword)
      .set('page', pageProperties.pageIndex)
      .set('size', pageProperties.pageSize)
    }
    return this.httpClient.get<PagedResponse<Product>> (environment.apiHost + "/products/search", {params : params})
  }

  getBudgetSuggestions(id: number, plannedAmount: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${environment.apiHost}/products/suggestions`,
      { params: new HttpParams().set('categoryId', id).set('price', plannedAmount) }
    );
  }

  get(id: number): Observable<Product> {
      return this.httpClient.get<Product>(`${environment.apiHost}/products/${id}`);
  }

  getImages(id: number): Observable<ImageResponseDto[]> {
    return this.httpClient.get<ImageResponseDto[]>(
      `${environment.apiHost}/products/${id}/images`,
    );
  }

  getImage(id: number): Observable<Blob> {
    return this.httpClient.get(
      `${environment.apiHost}/products/${id}/image`,
      { responseType: 'blob' }
    ) as Observable<Blob>;
  }

  removeFromFavourites(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiHost}/account/products/favourites/${id}`);
  }

  addToFavourites(id: number): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiHost}/account/products/favourites/${id}`, {});
  }

  getIsFavourite(id: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.apiHost}/account/products/favourites/${id}`);
  }

  filterProducts(filter: ProductFilter, pageProperties: PageProperties) : Observable<PagedResponse<Product>> {
    const params = this.buildQueryParams(filter, pageProperties)
    return this.httpClient.get<PagedResponse<Product>>(`${environment.apiHost}/products/filter`, { params })
  }

  buildQueryParams(filter: ProductFilter, pageProperties: PageProperties): HttpParams {
    let params = new HttpParams();

    if (filter) {
      Object.keys(filter).forEach((key) => {
        const typedKey = key as keyof ProductFilter;
        const value = filter[typedKey];

        if (value !== undefined && value != null && value != "")
          params = params.set(typedKey, value);
      });
    }

    params = params.set('page', pageProperties.pageIndex).set('size', pageProperties.pageSize);

    return params
  }

  getProviderProducts(filter?: ProductFilter, pageProperties?: PageProperties): Observable<PagedResponse<Product>> {
    let params = this.buildQueryParams(filter, pageProperties);
    return this.httpClient.get<PagedResponse<Product>>(`${environment.apiHost}/account/products`, { params: params});
  }

  searchProviderProducts(keyword: string, pageProperties?: PageProperties): Observable<PagedResponse<Product>> {
    let params = new HttpParams();
    if (pageProperties) {
      params = params
        .set('keyword', keyword)
        .set('page', pageProperties.pageIndex)
        .set('size', pageProperties.pageSize)
    }
    return this.httpClient.get<PagedResponse<Product>>(`${environment.apiHost}/account/products/search`, {params: params});
  }

  filterProviderProducts(filter: ProductFilter, pageProperties?: PageProperties): Observable<PagedResponse<Product>> {
    const params = this.buildQueryParams(filter, pageProperties);
    return this.httpClient.get<PagedResponse<Product>>(`${environment.apiHost}/account/products/filter`, { params: params });
  }

}
