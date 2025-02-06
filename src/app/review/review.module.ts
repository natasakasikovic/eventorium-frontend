import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewListComponent } from './review-list/review-list.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../infrastructure/material/material.module';
import { ManageCommentsComponent } from './manage-comments/manage-comments.component';
import {RouterLink} from '@angular/router';
import { ReviewCardComponent } from './review-card/review-card.component';



@NgModule({
  declarations: [
    ReviewListComponent,
    ManageCommentsComponent,
    ReviewCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterLink
  ],
  exports: [
    ReviewListComponent,
    ManageCommentsComponent
  ]
})
export class ReviewModule { }
