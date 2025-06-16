import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Product} from '../../product/model/product.model';
import {ProductService} from '../../product/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product: Product;

  @Input() showActions: boolean;
  @Output() delete: EventEmitter<Product> = new EventEmitter();

  constructor(
    private service: ProductService
  ) { }

  ngOnInit(): void {
    this.service.getImage(this.product.id).subscribe({
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

  onDelete(): void {
    this.delete.emit(this.product);
  }
  
  ngOnDestroy(): void {
    URL.revokeObjectURL(this.product.images[0]);
  }
}
