import {Component, Input, OnInit} from '@angular/core';
import { Product } from '../../product/model/product.model';
import {ProductService} from '../../product/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    console.log(this.product);
    this.productService.getImage(this.product.id).subscribe({
      next: (blob: Blob) => {
        this.product.images = [];
        this.product.images.push(URL.createObjectURL(blob));
      },
      error: (_) => {
        this.product.images = [];
        this.product.images.push("/photo_placeholder.png");
      }
    });
  }

}
