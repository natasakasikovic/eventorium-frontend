import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Product } from '../../product/model/product.model';
import {ProductService} from '../../product/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() reviewable: boolean;

  @Output() review: EventEmitter<Product> = new EventEmitter();

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
    if (this.eventId && this.plannedAmount) {
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

  onReview(): void {
    this.review.emit(this.product);
  }
}
