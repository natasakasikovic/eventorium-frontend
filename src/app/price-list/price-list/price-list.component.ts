import {Component, OnInit, ViewChild} from '@angular/core';
import {PriceListItem} from '../model/price-list-item.model';
import {PriceListService} from '../price-list.service';
import {PageProperties} from '../../shared/model/page-properties.model';
import {PagedResponse} from '../../shared/model/paged-response.model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTabGroup} from '@angular/material/tabs';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.css'
})
export class PriceListComponent implements OnInit {
  products: PriceListItem[];
  services: PriceListItem[];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup | undefined;

  getSelectedTabIndex(): number {
    if (this.tabGroup) {
      return this.tabGroup.selectedIndex;
    }
    return null;
  }

  pageProperties: PageProperties = {
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0
  }

  constructor(
    private priceListService: PriceListService,
    private toasterService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.loadServices();
    this.loadProducts();
  }

  onPageChanged(pageEvent: PageEvent): void {
    this.pageProperties.pageIndex = pageEvent.pageIndex;
    this.pageProperties.pageSize = pageEvent.pageSize;
    if(this.getSelectedTabIndex() == 0) {
      this.loadProducts();
    } else {
      this.loadServices();
    }
  }

  loadServices(): void {
    this.priceListService.getServices(this.pageProperties).subscribe({
      next: (items: PagedResponse<PriceListItem>) => {
        this.services = items.content;
        this.pageProperties.totalCount = items.totalElements;
      }
    });
  }

  loadProducts(): void {
    this.priceListService.getProducts(this.pageProperties).subscribe({
      next: (items: PagedResponse<PriceListItem>) => {
        this.products = items.content;
        this.pageProperties.totalCount = items.totalElements;
      }
    });
  }

  updateService(service: PriceListItem): void {
    this.priceListService.updateService(service.id, {
      discount: service.discount,
      price: service.price
    }).subscribe({
      next: (item: PriceListItem) => {
        this.toasterService.success(`${item.name} has been updated successfully!`, "Price list");
      },
      error: (error: HttpErrorResponse) => {
        this.toasterService.error(`${error.error.message}`, "Failed to update service");
      }
    });
  }

  updateProduct(product: PriceListItem): void {
    this.priceListService.updateProduct(product.id, {
      discount: product.discount,
      price: product.price
    }).subscribe({
      next: (item: PriceListItem) => {
        this.toasterService.success(`${item.name} has been updated successfully!`, "Price list");
      },
      error: (error: HttpErrorResponse) => {
        this.toasterService.error(`${error.error.message}`, "Failed to update product");
      }
    });
  }

  downloadPdf(): void {
    this.priceListService.downloadPdf().subscribe({
      next: (blob: Blob) => {
        const fileURL = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = fileURL;
        link.download = 'price_list_report.pdf';
        link.click();
      }
    });
  }
}
