import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-five-products',
  templateUrl: './top-five-products.component.html',
  styleUrl: './top-five-products.component.css'
})

export class TopFiveProductsComponent implements OnInit {
  
  products: Product[];

  constructor(private productService: ProductService,  private router: Router) {}

  ngOnInit(): void {
    this.loadTopProducts();
  }

  loadTopProducts(): void {
    this.products = this.productService.getTopProducts();
  }

  navigateToProductsOverview() {
    this.router.navigate(['/products-overview']);
  }
}