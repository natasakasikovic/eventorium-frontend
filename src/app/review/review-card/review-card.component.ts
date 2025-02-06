import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../model/review.model';
import {ProductService} from '../../product/product.service';
import {ServiceService} from '../../service/service.service';
import {RatingService} from '../rating.service';
import {Rating} from '../model/rating.model';
import {HttpErrorResponse} from '@angular/common/http';
import {CommentDialogComponent} from '../comment-dialog/comment-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CommentService} from '../comment.service';
import {ReviewType} from '../model/review-type.enum';
import {Comment} from '../model/comment.model';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent implements OnInit {
  @Input() item: Review;

  image: string = "/photo_placeholder.png";
  stars: number[] = [1, 2, 3, 4, 5];
  rating: number;

  constructor(
    private productService: ProductService,
    private serviceService: ServiceService,
    private ratingService: RatingService,
    private commentService: CommentService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadImages();
    if(this.item.rating) {
      this.rating = this.item.rating.rating;
    }
  }

  loadImages(): void {
    if(this.item.type === ReviewType.PRODUCT) {
      this.productService.getImage(this.item.id).subscribe({
        next: (blob: Blob) => {
          this.image = URL.createObjectURL(blob);
        }
      });
    } else {
      this.serviceService.getImage(this.item.id).subscribe({
        next: (blob: Blob) => {
          this.image = URL.createObjectURL(blob);
        }
      });
    }
  }

  rate(star: number) {
    if(!this.item.rating) {
      this.rating = star;
    }
  }

  onRate(): void {
    this.ratingService.createRating(this.item.id, this.item.type, this.rating).subscribe({
      next: (rating: Rating) => {
        this.item.rating = rating;
        console.log("Success");
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.error.message);
      }
    });
  }

  openDialog(): void {
    const dialog = this.dialog.open(CommentDialogComponent, {
      width: '450px',
      height: 'auto',
      data: this.item
    });
    this.handleCloseDialog(dialog)
  }

  private handleCloseDialog(dialog: MatDialogRef<CommentDialogComponent>): void {
    dialog.afterClosed().subscribe(({ comment }: { comment: string }) => {
      this.commentService.createComment(this.item.id, this.item.type, { comment: comment }).subscribe({
        next: (comment: Comment) => {
          console.log("Success");
        }
      });
    });
  }
}
