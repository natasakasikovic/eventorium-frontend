import {Component, OnInit, ViewChild} from '@angular/core';
import {PriceListItem} from '../model/price-list-item.model';
import {PriceListService} from '../price-list.service';
import {PageProperties} from '../../shared/model/page-properties.model';
import {PagedResponse} from '../../shared/model/paged-response.model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Product} from '../../product/model/product.model';
import {MatTabGroup} from '@angular/material/tabs';

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
    pageSize: 3,
    totalCount: 0
  }

  constructor(
    private priceListService: PriceListService
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
      discount: service.price,
      price: service.discount
    });
  }

  updateProduct(product: PriceListItem): void {
    this.priceListService.updateProduct(product.id, {
      discount: product.price,
      price: product.discount
    });
  }
}
