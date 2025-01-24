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

  eventId: number;
  plannedAmount: number;

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
      this.loadProduct(+param['id']);
    });
    this.route.queryParams.subscribe(param => {
      if(param['eventId']) {
        this.eventId = +param['eventId'];
        this.plannedAmount = +param['plannedAmount'];
      }
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
    if(this.eventId && this.plannedAmount) {
      this.plannedPurchase();
    } else {
      this.draftedPurchase();
    }
  }

  openChatDialog(recipient?: ChatUserDetails): void {
    this.chatService.openChatDialog(recipient ? recipient : this.product.provider);
  }

  getRole(): string {
    return this.authService.getRole();
  }

  private draftedPurchase(): void {
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

  private loadProduct(id: number): void {
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
      error: (error) => this.handleError(error)
    });
  }

  private handleError(error: HttpErrorResponse): void {
    void this.router.navigate(['/error'], {
      queryParams: {
        code: error.status,
        message: error.error?.message || 'An unknown error occurred.'
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
          this.toasterService.success("Success", "Successfully purchased product!");
          if(this.plannedAmount && this.eventId) {
            void this.router.navigate(['budget-planning', this.eventId]);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.toasterService.error(error.error.message, "Failed to purchase product");
        }
      });
    } else {
      this.toasterService.error("You have already purchased a product from this category.", "Purchase Failed");
    }
  }

  private plannedPurchase(): void {
    this.budgetService.getBudget(this.eventId).subscribe({
      next: (budget: Budget) => {
        this.purchaseProduct(this.eventId, budget, this.plannedAmount);
      }
    })
  }
}
