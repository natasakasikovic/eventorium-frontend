import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Service} from '../../service/model/service.model';
import {Product} from '../../product/model/product.model';
import {Event} from '../../event/model/event.model'
import {ToastrService} from 'ngx-toastr';
import {ReviewType} from '../model/review-type.enum';
import {Review} from '../model/review.model';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrl: './comment-dialog.component.css'
})
export class CommentDialogComponent {
  comment: string = '';

  formError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Review
  ) {
  }


  closeDialog(): void {
    if(this.comment.trim()) {
      this.dialogRef.close({ comment: this.comment });
    } else {
      this.formError = true;
    }
  }

}
