import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DrawerComponent } from './drawer/drawer.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ProductModule } from '../product/product.module';
import { EventModule } from '../event/event.module';
import { ServiceModule } from '../service/service.module';

@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent,
    DrawerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    ProductModule,
    EventModule,
    ServiceModule
  ],
  exports: [NavBarComponent, DrawerComponent]
})
export class LayoutModule { }
