import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../model/product.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PagedResponse } from '../../shared/model/paged-response.model';

@Component({
  selector: 'app-products-overview',
  templateUrl: './products-overview.component.html',
  styleUrl: './products-overview.component.css'
})

export class ProductsOverviewComponent implements OnInit {

  pageProperties = {
    pageIndex: 0,
    pageSize: 15,
    totalCount: 0
  }

  showFilter: boolean; // TODO: implement product filter pop up
  products: Product[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private service: ProductService, private changeDetector: ChangeDetectorRef ) { }

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
    })  
  }

  onPageChanged(pageEvent : PageEvent): void {
    this.pageProperties.pageIndex = pageEvent.pageIndex;
    this.pageProperties.pageSize = pageEvent.pageSize;
    this.getPagedProducts();
  }

  closeFilter(): void {
    this.showFilter = false;
  }

  openFilter(): void {
    this.showFilter = true;
  }

  onSearch(keyword: string): void {
    this.products = this.service.searchProducts(keyword);
    this.changeDetector.detectChanges();
  }
}
