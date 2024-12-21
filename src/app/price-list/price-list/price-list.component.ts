import {Component, OnInit, ViewChild} from '@angular/core';
import {PriceListItem} from '../model/price-list-item.model';
import {PriceListService} from '../price-list.service';
import {PageProperties} from '../../shared/model/page-properties.model';
import {PagedResponse} from '../../shared/model/paged-response.model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.css'
})
export class PriceListComponent implements OnInit {
  products: PriceListItem[];
  services: PriceListItem[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  pageProperties: PageProperties = {
    pageIndex: 0,
    pageSize: 10,
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

  }

}
