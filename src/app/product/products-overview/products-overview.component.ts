import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../model/product.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-products-overview',
  templateUrl: './products-overview.component.html',
  styleUrl: './products-overview.component.css'
})

export class ProductsOverviewComponent implements OnInit, AfterViewInit {

  showFilter: boolean; // TODO: implement product filter pop up
  products: Product[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private productService: ProductService, private changeDetector: ChangeDetectorRef ) { }

  ngOnInit(): void { }

  closeFilter(): void {
    this.showFilter = false;
  }

  openFilter(): void {
    this.showFilter = true;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.products = this.productService.getPage(this.paginator.pageSize, this.paginator.pageIndex); }, 0);
  }

  getTotalProductCount(): number {
    return this.productService.totalCountProducts();
  }

  onPageChanged(): void {
    this.products = this.productService.getPage(this.paginator.pageSize, this.paginator.pageIndex);
  }

  onSearch(keyword: string): void {
    this.products = this.productService.searchProducts(keyword);
    this.changeDetector.detectChanges();
  }
}
