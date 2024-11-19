import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-top-five-products',
  templateUrl: './top-five-products.component.html',
  styleUrl: './top-five-products.component.css'
})

export class TopFiveProductsComponent implements OnInit {
  
  products: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadTopProducts();
  }

  loadTopProducts(): void {
    this.products = this.productService.getTopProducts();
  }

}