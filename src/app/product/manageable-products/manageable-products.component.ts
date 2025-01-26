import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductService } from '../product.service';
import { PageProperties } from '../../shared/model/page-properties.model';
import { ProductFilter } from '../model/product-filter.model';
import { PagedResponse } from '../../shared/model/paged-response.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-manageable-products',
  templateUrl: './manageable-products.component.html',
  styleUrl: './manageable-products.component.css'
})
export class ManageableProductsComponent implements OnInit {
  products: Product[]

  constructor(private service: ProductService) {}

  pageProperties: PageProperties = {
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0
  }
  activeFilter?: ProductFilter = null;
  keyword: string = "";

  ngOnInit(): void {
    this.getProductsPaged();
  }

  private getProductsPaged() {
    this.service.getProviderProducts(this.activeFilter, this.pageProperties).subscribe({
      next: (response: PagedResponse<Product>) => {
        this.products = response.content;
        this.pageProperties.totalCount = response.totalElements;
      }
    })
  }

  onPageChanged(pageEvent: PageEvent): void {
    this.pageProperties.pageIndex = pageEvent.pageIndex;
    this.pageProperties.pageSize = pageEvent.pageSize;
    this.getProductsPaged();
  }

  onSearch(keyword: string): void {
    this.resetPageIndex(keyword, null);
    this.keyword = keyword;
    this.service.searchProviderProducts(keyword, this.pageProperties).subscribe({
      next: (response: PagedResponse<Product>) => {
        this.products = response.content;
        this.pageProperties.totalCount = response.totalElements;
      }
    })
  }

  private resetPageIndex(keyword: string | null, filter: ProductFilter | null): void {
    if ((keyword && this.keyword != keyword) || (filter && this.activeFilter !== filter) && this.pageProperties.pageIndex != 0)
      this.pageProperties.pageIndex = 0;
  }

}
