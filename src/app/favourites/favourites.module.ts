import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesComponent } from './favourites/favourites.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    FavouritesComponent
  ],
  imports: [
    CommonModule, 
    SharedModule,
    MaterialModule
]
})
export class FavouritesModule { }
