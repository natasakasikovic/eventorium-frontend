import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Product } from '../../product/model/product.model';
import {ProductService} from '../../product/product.service';
import {BudgetService} from '../../budget/budget.service';
import {Router} from '@angular/router';
import {EventService} from '../../event/event.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;

  @Input() purchasable: boolean;
  @Output() purchase: EventEmitter<Product> = new EventEmitter();

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
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

  onPurchase(): void {
    this.purchase.emit(this.product);
  }

}
