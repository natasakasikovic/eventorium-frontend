import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../model/product.model';
import { PageEvent } from '@angular/material/paginator';
import { PagedResponse } from '../../shared/model/paged-response.model';
import { ProductsFilterDialogComponent } from '../products-filter-dialog/products-filter-dialog.component';
import { PageProperties } from '../../shared/model/page-properties.model';
import { ProductFilter } from '../model/product-filter.model';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-products-overview',
  templateUrl: './products-overview.component.html',
  styleUrl: './products-overview.component.css'
})

export class ProductsOverviewComponent implements OnInit {

  pageProperties = {
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0
  }

  products: Product[];
  keyword: string;
  activeFilter: ProductFilter;

  constructor(private dialog: MatDialog, private service: ProductService) { }

  ngOnInit(): void {
    this.getPagedProducts();
  }

  private getPagedProducts() {
    this.service.getAll(this.pageProperties)
    .subscribe({
      next: (response: PagedResponse<Product>) => {
        this.products = response.content;
        this.pageProperties.totalCount = response.totalElements;
      }
    });
  }

  onPageChanged(pageEvent : PageEvent): void {
    this.pageProperties.pageIndex = pageEvent.pageIndex;
    this.pageProperties.pageSize = pageEvent.pageSize;

    if (this.keyword)
      this.onSearch(this.keyword)
    else if (this.activeFilter)
      this.filterProducts(this.activeFilter)
    else
      this.getPagedProducts();
  }

  openDialog() {
    let dialog = this.dialog.open(ProductsFilterDialogComponent, {
      height: '510px',
      width: '600px',
    });

    this.handleDialogClose(dialog);
  }

  private handleDialogClose(dialogRef: MatDialogRef<ProductsFilterDialogComponent>): void {
    dialogRef.afterClosed().subscribe((filter: ProductFilter) => {
      this.filterProducts(filter);
    });
  }

  private preprocessFilter(filter: ProductFilter){
    this.resetPageIndex(null, filter);
    this.activeFilter = filter;
    this.keyword = null;
  }

  filterProducts(filter: ProductFilter) {
    this.preprocessFilter(filter);
    this.service.filterProducts(filter, this.pageProperties).subscribe({
      next: (response: PagedResponse<Product>) => {
        this.products = response.content;
        this.pageProperties.totalCount = response.totalElements;
      },
      error: (err) => {
        if (err.status == 400)
          this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, err.error.message)
        else
          this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.SERVER_ERROR)
      }
    })
  }

  onSearch(keyword: string): void {
    this.resetPageIndex(keyword, null)
    this.keyword = keyword
    this.service.searchProducts(keyword, this.pageProperties).subscribe({
        next: (response: PagedResponse<Product>) => {
          this.products = response.content;
          this.pageProperties.totalCount = response.totalElements
        }
    })
  }

  private resetPageIndex(keyword: string | null, filter: ProductFilter | null): void {
    if ((keyword && this.keyword != keyword) || (filter && this.activeFilter !== filter) && this.pageProperties.pageIndex != 0)
      this.pageProperties.pageIndex = 0
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        message: message
      }
    })
  }
}
