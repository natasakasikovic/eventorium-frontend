import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import {ServiceCardComponent} from './shared/service-card/service-card.component';
import {ManageableServicesComponent} from './service/manageable-services/manageable-services.component';

const routes: Routes = [
  { path: 'manageable-services', component: ManageableServicesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
