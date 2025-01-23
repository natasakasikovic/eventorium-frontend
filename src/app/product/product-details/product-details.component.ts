import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../model/product.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageResponseDto} from '../../shared/model/image-response-dto.model';
import {ProductService} from '../product.service';
import {forkJoin, switchMap} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {EventService} from '../../event/event.service';
import {BudgetService} from '../../budget/budget.service';
import {Event} from '../../event/model/event.model';
import {Category} from '../../category/model/category.model';
import {MatDialog} from '@angular/material/dialog';
import {Budget} from '../../budget/model/budget.model';
import {EventSelectionComponent} from '../../shared/event-selection/event-selection.component';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {ChatDialogService} from '../../shared/chat-dialog/chat-dialog.service';
import {ChatUserDetails} from '../../web-socket/model/chat-user.model';

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
    private eventService: EventService,
    private budgetService: BudgetService,
    private authService: AuthService,
    private toasterService: ToastrService,
    private dialog: MatDialog,
    private router: Router,
    private chatService: ChatDialogService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id: number = +param['id'];
      this.productService.get(id).pipe(
        switchMap((product: Product) => {
          if (this.getRole()) {
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
          if(this.getRole) {
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

  onPurchase(): void {
    this.eventService.getDraftedEvents().subscribe({
      next: (events: Event[]) => {
          const dialogRef = this.dialog.open(EventSelectionComponent, {
            width: '450px',
            height: 'auto',
            disableClose: true,
            panelClass: 'custom-dialog-container',
            data: events
          });

        dialogRef.afterClosed().subscribe(({ plannedAmount, event }: { plannedAmount: number, event: Event }) => {
          if(event != null) {
            this.purchaseProduct(event.id, event.budget, plannedAmount);
          }
          dialogRef.close();
        });
      }
    });
  }

  private purchaseProduct(eventId: number, budget: Budget, plannedAmount: number): void {
    const purchasedCategories: Category[] = [...budget.items.map(item => item.category)];
    if(!purchasedCategories.some(category => category.id === this.product.category.id)) {
      this.budgetService.purchase(eventId, {
        category: this.product.category,
        itemId: this.product.id,
        plannedAmount: plannedAmount
      }).subscribe({
        next: () => {
          void this.router.navigate(['budget-planning', eventId]);
          this.toasterService.success("Success", "Successfully purchased product!");
        },
        error: (error: HttpErrorResponse) => {
          this.toasterService.error(error.error.message, "Failed to purchase product");
        }
      });
    }
  }

  openChatDialog(recipient?: ChatUserDetails): void {
    this.chatService.openChatDialog(recipient ? recipient : this.product.provider);
  }

  getRole(): string {
    return this.authService.getRole();
  }
}
