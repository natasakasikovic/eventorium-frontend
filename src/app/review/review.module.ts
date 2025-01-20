import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewListComponent } from './review-list/review-list.component';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatPaginator} from '@angular/material/paginator';
import {MatToolbar} from '@angular/material/toolbar';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../infrastructure/material/material.module';



@NgModule({
  declarations: [
    ReviewListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    ReviewListComponent
  ]
})
export class ReviewModule { }
