import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import {SharedModule} from '../shared/shared.module';
import { CategoriesOverviewComponent } from './category-overview/categories-overview.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    CategoriesOverviewComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    CategoryCardComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        RouterLink
    ]
})
export class CategoryModule { }
