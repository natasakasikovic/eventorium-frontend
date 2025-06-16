import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductService } from '../product.service';
import { PageProperties } from '../../shared/model/page-properties.model';
import { ProductFilter } from '../model/product-filter.model';
import { PagedResponse } from '../../shared/model/paged-response.model';
import { PageEvent } from '@angular/material/paginator';
import { ProductsFilterDialogComponent } from '../products-filter-dialog/products-filter-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { MESSAGES } from '../../shared/constants/messages';

@Component({
  selector: 'app-manageable-products',
  templateUrl: './manageable-products.component.html',
  styleUrl: './manageable-products.component.css'
})
export class ManageableProductsComponent implements OnInit {
  products: Product[]

  constructor(
    private service: ProductService,
    private dialog: MatDialog,
    private toasterService: ToastrService
  ) {}

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

  openDialog() {
    let dialog = this.dialog.open(ProductsFilterDialogComponent, {
      height: '510px',
      width: '600px',
    });

    this.handleFilterDialogClose(dialog);
  }

  private handleFilterDialogClose(dialogRef: MatDialogRef<ProductsFilterDialogComponent>): void {
    dialogRef.afterClosed().subscribe((filter: ProductFilter) => {
      this.filterProducts(filter);
    })
  }

  filterProducts(filter: ProductFilter) {
    this.preprocessFilter(filter);
    this.service.filterProviderProducts(filter, this.pageProperties).subscribe({
      next: (response: PagedResponse<Product>) => {
        this.products = response.content;
        this.pageProperties.totalCount = response.totalElements;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status >= 500)
          this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.SERVER_ERROR);
        else 
          this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, err.error.message);
      }
    })
  }

  private preprocessFilter(filter: ProductFilter){
    this.resetPageIndex(null, filter);
    this.activeFilter = filter;
    this.keyword = null;
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent,
      { data: { title: title, message: message } }
    );
  }

  openDeleteConfirmation(product: Product): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: { message: MESSAGES.deleteConfirmation + " " + product.name + "?"}
      });
      this.handleConfirmationDialogClose(dialogRef, product)
  }

  private handleConfirmationDialogClose(dialogRef: MatDialogRef<ConfirmationDialogComponent>, service: Product){
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed)
        this.deleteProduct(service);
    });
  }
  
  private deleteProduct(product: Product) {
    this.service.delete(product.id).subscribe({
      next: () => {
        this.toasterService.success(`${product.name} has been deleted successfully!`, "Success");
        this.products = this.products.filter(s => s.id !== product.id);
      },
      error: (error: HttpErrorResponse) => {
        this.toasterService.error(error.error.message, "Failed to delete service");
      }
    });
  }

}
