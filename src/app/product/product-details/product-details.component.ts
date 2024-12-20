import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../model/product.model';
import {ActivatedRoute} from '@angular/router';
import {ImageResponseDto} from '../../shared/model/image-response-dto.model';
import {ProductService} from '../product.service';
import {forkJoin, switchMap} from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: Product;
  isFavorite: boolean;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id: number = +param['id'];
      this.productService.get(id).pipe(
        switchMap((product: Product) =>
          forkJoin([
            this.productService.get(id),
            this.productService.getImages(product.id),
            this.productService.getIsFavourite(product.id)
          ])
        )
      ).subscribe({
        next: ([product, images, isFavourite]: [Product, ImageResponseDto[], boolean]) => {
          this.product = product;
          this.isFavorite = isFavourite;
          this.product.images = images.map(image =>
            `data:${image.contentType};base64,${image.data}`
          );
        },
        error: (error) => {
          console.error('Error loading product or images:', error);
        }
      });
    });
  }

  toggleFavouriteProduct(): void {
    if(this.isFavorite) {
      this.productService.removeFromFavourites(this.product.id).subscribe({
        next: () => {
          this.isFavorite = false;
        }
      });
    } else {
      this.productService.addToFavourites(this.product.id).subscribe({
        next: () => {
          this.isFavorite = true;
        }
      });
    }
  }

}
