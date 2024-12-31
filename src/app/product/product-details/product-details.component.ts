import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../model/product.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceService} from '../../service/service.service';
import {Service} from '../../service/model/service.model';
import {ImageResponseDto} from '../../shared/model/image-response-dto.model';
import {ProductService} from '../product.service';
import {forkJoin, switchMap} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ChatDialogService} from '../../shared/chat-dialog/chat-dialog.service';

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
    private productService: ProductService,
    private authService: AuthService,
    private toasterService: ToastrService,
    private router: Router,
    private chatService: ChatDialogService
  ) {
  }

  get loggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id: number = +param['id'];
      this.productService.get(id).pipe(
        switchMap((product: Product) => {
          if (this.loggedIn) {
            return forkJoin([
              this.productService.get(id),
              this.productService.getImages(product.id),
              this.productService.getIsFavourite(product.id)
            ]);
          } else {
            return forkJoin([
              this.productService.get(id),
              this.productService.getImages(product.id),
            ]);
          }
        })
      ).subscribe({
        next: ([product, images, isFavourite]: [Product, ImageResponseDto[], boolean?]) => {
          this.product = product;
          if(this.loggedIn) {
            this.isFavorite = isFavourite;
          }
          this.product.images = images.map(image =>
            `data:${image.contentType};base64,${image.data}`
          );
        },
        error: (error) => {
          void this.router.navigate(['/error'], {
            queryParams: {
              code: error.status,
              message: error.error?.message || 'An unknown error occurred.'
            }
          });
        }
      });
    });
  }

  toggleFavouriteProduct(): void {
    if(this.isFavorite) {
      this.productService.removeFromFavourites(this.product.id).subscribe({
        next: () => {
          this.toasterService.info(`Removed ${this.product.name} from favourite products`, "Favourite products");
          this.isFavorite = false;
        }
      });
    } else {
      this.productService.addToFavourites(this.product.id).subscribe({
        next: () => {
          this.toasterService.success(`Added ${this.product.name} to favourite products`, "Favourite products");
          this.isFavorite = true;
        }
      });
    }
  }

  openChatDialog(recipientId?: number): void {
    this.chatService.openChatDialog(recipientId ? recipientId : this.product.provider.id);
  }
}
