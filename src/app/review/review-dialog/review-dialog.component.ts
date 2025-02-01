import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Service} from '../../service/model/service.model';
import {Product} from '../../product/model/product.model';
import {Event} from '../../event/model/event.model'
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.css'
})
export class ReviewDialogComponent {
  feedback: string = '';
  rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  formError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Service | Product | Event
  ) {
  }

  rate(star: number) {
    this.rating = star;
  }

  closeDialog(): void {
    if(this.rating && this.feedback) {
      this.dialogRef.close({feedback: this.feedback, rating: this.rating, id: this.data.id });
    } else {
      this.formError = true;
    }
  }
}
