import {Component, OnInit} from '@angular/core';
import {Product} from '../../product/model/product.model';
import {Service} from '../../service/model/service.model';
import {ProductService} from '../../product/product.service';
import {ServiceService} from '../../service/service.service';
import {PagedResponse} from '../../shared/model/paged-response.model';
import {MatDialog} from '@angular/material/dialog';
import {ProductsFilterDialogComponent} from '../../product/products-filter-dialog/products-filter-dialog.component';
import {ReviewDialogComponent} from '../review-dialog/review-dialog.component';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent implements OnInit {
  products: Product[];
  services: Service[];

  constructor(
    private productService: ProductService,
    private serviceService: ServiceService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (products: PagedResponse<Product>) => {
        this.products = products.content;
      }
    });
  }

  openDialog(data: Product | Service): void {
    const dialog = this.dialog.open(ReviewDialogComponent, {
      data: data
    });
  }
}
