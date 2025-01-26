import {Component, OnInit} from '@angular/core';
import {Product} from '../../product/model/product.model';
import {Service} from '../../service/model/service.model';
import {ProductService} from '../../product/product.service';
import {ServiceService} from '../../service/service.service';
import {PagedResponse} from '../../shared/model/paged-response.model';
import {MatDialog} from '@angular/material/dialog';
import {ProductsFilterDialogComponent} from '../../product/products-filter-dialog/products-filter-dialog.component';
import {ReviewDialogComponent} from '../review-dialog/review-dialog.component';
import {Review} from '../model/review.model';
import {ReviewService} from '../review.service';
import {HttpErrorResponse} from '@angular/common/http';
import {EventService} from '../../event/event.service';
import {EventSummary} from '../../event/model/event-summary.model';
import {ToastrService} from 'ngx-toastr';
import {MatSelectChange} from '@angular/material/select';
import {BudgetService} from '../../budget/budget.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent implements OnInit {
  products: Product[];
  services: Service[];

  events: EventSummary[]

  constructor(
    private eventService: EventService,
    private reviewService: ReviewService,
    private budgetService: BudgetService,
    private toasterService: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.eventService.getOrganizerEvent().subscribe({
      next: (events: EventSummary[]) => {
        this.events = events;
      }
    });
  }

  openDialog(data: Product | Service): void {
    const dialog = this.dialog.open(ReviewDialogComponent, {
      data: data
    });
    dialog.afterClosed().subscribe(({feedback, rating, id} : {feedback: string, rating: number, id: number}) => {
      this.reviewService.createProductReview(id, { feedback: feedback, rating: rating }).subscribe({
        next: () => {
          this.toasterService.success(`Review for ${ data.name } has been created successfully!`, "Success");
        },
        error: (error: HttpErrorResponse) => {
          this.toasterService.error(error.error.message, "Failed to create review");
        }
      })
    });
  }

  onEventChange(changeEvent: MatSelectChange) {
    const selectedEvent: EventSummary = changeEvent.value;
    this.budgetService.getPurchased(selectedEvent.id).subscribe({
      next: (products: Product[]) => {
        this.products = products;
      }
    });
  }
}
