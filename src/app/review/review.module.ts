import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewListComponent } from './review-list/review-list.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../infrastructure/material/material.module';
import { ManageReviewsComponent } from './manage-reviews/manage-reviews.component';



@NgModule({
  declarations: [
    ReviewListComponent,
    ManageReviewsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    ReviewListComponent,
    ManageReviewsComponent
  ]
})
export class ReviewModule { }
