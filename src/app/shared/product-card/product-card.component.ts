import {Component, EventEmitter, Input, numberAttribute, OnInit, Output} from '@angular/core';
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

  @Input() isBudgetContext: boolean = false;
  @Input() eventId: number;
  @Input() plannedAmount: number;

  constructor(
    private productService: ProductService,
    private router: Router
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

  onClick(): void {
    if (this.isBudgetContext && this.eventId && this.plannedAmount) {
      void this.router.navigate(['/product-details', this.product.id], {
        queryParams: {
          eventId: this.eventId,
          plannedAmount: this.plannedAmount,
        },
      });
    } else {
      void this.router.navigate(['/product-details', this.product.id]);
    }
  }
}
