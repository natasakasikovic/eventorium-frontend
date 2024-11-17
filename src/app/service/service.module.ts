import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageableServicesComponent } from './manageable-services/manageable-services.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatIconButton} from '@angular/material/button';
import {SharedModule} from '../shared/shared.module';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {MaterialModule} from '../infrastructure/material/material.module';



@NgModule({
  declarations: [
    ManageableServicesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterLink
  ]
})
export class ServiceModule { }
