import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewableSolutionsComponent } from './reviewable-solutions/reviewable-solutions.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../infrastructure/material/material.module';
import { ManageCommentsComponent } from './manage-comments/manage-comments.component';
import {RouterLink} from '@angular/router';
import { ReviewCardComponent } from './review-card/review-card.component';



@NgModule({
  declarations: [
    ReviewableSolutionsComponent,
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
    ReviewableSolutionsComponent,
    ManageCommentsComponent
  ]
})
export class ReviewModule { }
