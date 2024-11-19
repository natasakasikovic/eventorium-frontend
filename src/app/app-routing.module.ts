import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import {ServiceCardComponent} from './shared/service-card/service-card.component';
import {ManageableServicesComponent} from './service/manageable-services/manageable-services.component';
import {ServiceDetailsComponent} from './service/service-details/service-details.component';
import {EditServiceComponent} from './service/edit-service/edit-service.component';
import {CreateServiceComponent} from './service/create-service/create-service.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'manageable-services', component: ManageableServicesComponent },
  { path: 'service-details/:id', component: ServiceDetailsComponent },
  { path: 'edit-service/:id', component: EditServiceComponent },
  { path: 'create-service', component: CreateServiceComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
