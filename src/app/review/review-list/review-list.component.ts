import {Component, OnInit} from '@angular/core';
import {Product} from '../../product/model/product.model';
import {Service} from '../../service/model/service.model';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ReviewDialogComponent} from '../review-dialog/review-dialog.component';
import {CommentService} from '../comment.service';
import {HttpErrorResponse} from '@angular/common/http';
import {EventService} from '../../event/event.service';
import {EventSummary} from '../../event/model/event-summary.model';
import {ToastrService} from 'ngx-toastr';
import {MatSelectChange} from '@angular/material/select';
import {BudgetService} from '../../budget/budget.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent {
  products: Product[];
  services: Service[];

  events: EventSummary[]

  constructor(
    private eventService: EventService,
    private commentService: CommentService,
    private authService: AuthService,
    private budgetService: BudgetService,
    private toasterService: ToastrService,
    private dialog: MatDialog
  ) { }

  // ngOnInit(): void {
  //   this.loadEvents();
  // }
  //
  // openDialog(data: Product | Service): void {
  //   const dialog = this.dialog.open(ReviewDialogComponent, {
  //     width: '450px',
  //     height: 'auto',
  //     data: data
  //   });
  //   this.handleCloseDialog(dialog, data)
  // }

  // onEventChange(changeEvent: MatSelectChange) {
  //   const selectedEvent: EventSummary = changeEvent.value;
  //   this.budgetService.getPurchased(selectedEvent.id).subscribe({
  //     next: (products: Product[]) => {
  //       const userId: number = this.authService.getUserId();
  //       this.products = products
  //         .filter(product =>
  //           !product.comments.map(review => review.user.id).includes(userId));
  //     }
  //   });
  // }
  //
  // private handleCloseDialog(dialog: MatDialogRef<ReviewDialogComponent>, data: Product | Service): void {
  //   dialog.afterClosed().subscribe(({feedback, rating, id} : {feedback: string, rating: number, id: number}) => {
  //     this.commentService.createComment(id, {feedback: feedback, rating: rating}).subscribe({
  //       next: () => {
  //         this.toasterService.success(`Review for ${data.name} has been created successfully!`, "Success");
  //         this.products = this.products.filter(product => product.id !== id);
  //       },
  //       error: (error: HttpErrorResponse) => {
  //         this.toasterService.error(error.error.message, "Failed to create review");
  //       }
  //     });
  //   });
  // }
  //
  // private loadEvents(): void {
  //   this.eventService.getOrganizerEvents().subscribe({
  //     next: (events: EventSummary[]) => {
  //       this.events = events;
  //     }
  //   });
  // }

}
