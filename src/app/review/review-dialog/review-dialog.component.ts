import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Service} from '../../service/model/service.model';
import {Product} from '../../product/model/product.model';
import {Event} from '../../event/model/event.model'

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.css'
})
export class ReviewDialogComponent {
  feedback: string = '';
  rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Service | Product | Event
  ) {
  }

  rate(star: number) {
    this.rating = star;
  }

}
