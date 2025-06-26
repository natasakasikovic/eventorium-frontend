import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewableSolutionsComponent } from './reviewable-solutions/reviewable-solutions.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../infrastructure/material/material.module';
import { ManageCommentsComponent } from './manage-comments/manage-comments.component';
import {RouterLink} from '@angular/router';
import { ReviewableSolutionCardComponent } from './reviewable-solution-card/reviewable-solution-card.component';
import { CommentsDialogComponent } from './comments-dialog/comments-dialog.component';



@NgModule({
  declarations: [
    ReviewableSolutionsComponent,
    ManageCommentsComponent,
    ReviewableSolutionCardComponent,
    CommentsDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterLink
  ],
  exports: [
    ReviewableSolutionsComponent,
    ManageCommentsComponent,
    CommentsDialogComponent
  ]
})
export class ReviewModule { }
