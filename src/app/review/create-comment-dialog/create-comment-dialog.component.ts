import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Service} from '../../service/model/service.model';
import {Product} from '../../product/model/product.model';
import {Event} from '../../event/model/event.model'
import {ToastrService} from 'ngx-toastr';
import {ReviewType} from '../model/review-type.enum';
import {ReviewableSolution} from '../model/reviewable-solution.model';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './create-comment-dialog.component.html',
  styleUrl: './create-comment-dialog.component.css'
})
export class CreateCommentDialogComponent {
  comment: string = '';

  formError: boolean = false;

  constructor( public dialogRef: MatDialogRef<CreateCommentDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: ReviewableSolution ) { } 

  closeDialog(): void {
    if(this.comment.trim())
      this.dialogRef.close({ comment: this.comment });
    else
      this.formError = true;
  }
}
