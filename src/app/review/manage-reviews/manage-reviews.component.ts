import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Review} from '../model/review.model';
import {ReviewService} from '../review.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {UserReportResponse} from '../../user/model/user-report-response.model';
import {Status} from '../../category/model/status-enum-ts';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-manage-reviews',
  templateUrl: './manage-reviews.component.html',
  styleUrl: './manage-reviews.component.css'
})
export class ManageReviewsComponent implements OnInit, AfterViewInit {
  reviews: MatTableDataSource<Review> = new MatTableDataSource();
  displayedColumns: string[] = ['creationDate', 'user', 'feedback', 'rating', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private reviewService: ReviewService,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    this.reviewService.getPendingReviews().subscribe({
      next: (reviews: Review[]) => {
        this.reviews.data = reviews;
      }
    })
  }

  ngAfterViewInit(): void {
    this.reviews.paginator = this.paginator;
  }

  acceptReview(review: Review): void {
    this.reviewService.updateReview(review.id, Status.ACCEPTED).subscribe({
      next: (review: Review) => {
        this.reviews.data = this.reviews.data.filter(r => r.id !== review.id);
        this.toasterService.success("Review has been accepted successfully", "Success");
      }
    });
  }

  declineReview(review: Review): void {
    this.reviewService.updateReview(review.id, Status.DECLINED).subscribe({
      next: (review: Review) => {
        this.reviews.data = this.reviews.data.filter(r => r.id !== review.id);
        this.toasterService.success("Review has been declined successfully", "Success");
      }
    });
  }
}
