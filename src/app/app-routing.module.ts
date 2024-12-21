import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import {ManageableServicesComponent} from './service/manageable-services/manageable-services.component';
import {ServiceDetailsComponent} from './service/service-details/service-details.component';
import {EditServiceComponent} from './service/edit-service/edit-service.component';
import {CreateServiceComponent} from './service/create-service/create-service.component';
import { EventsOverviewComponent } from './event/events-overview/events-overview.component';
import { UserRegisterComponent } from './auth/user-register/user-register.component';
import { CompanyRegisterComponent } from './company/company-register/company-register.component';
import { ProductsOverviewComponent } from './product/products-overview/products-overview.component';
import { ServicesOverviewComponent } from './service/services-overview/services-overview.component';
import {CategoriesOverviewComponent} from './category/categories-overview/categories-overview.component';
import {EditCategoryComponent} from './category/edit-category/edit-category.component';
import {CreateCategoryComponent} from './category/create-category/create-category.component';
import {CategoryProposalsComponent} from './category/category-proposals/category-proposals.component';
import { CreateEventTypeComponent } from './event-type/create-event-type/create-event-type.component'
import { EditEventTypeComponent } from './event-type/edit-event-type/edit-event-type.component';
import { EventInvitationsComponent } from './event/event-invitations/event-invitations.component';
import { CreateEventComponent } from './event/create-event/create-event.component';
import { QuickRegistrationComponent } from './auth/quick-registration/quick-registration.component';
import { QuickRegistrationGuard } from './auth/guards/quick-registration.guard';
import { EventAgendaComponent } from './event/event-agenda/event-agenda.component';
import {BudgetPlanningComponent} from './budget/budget-planning/budget-planning.component';
import {NavigationGuard} from './infrastructure/navigation/guards/navigation.guard';
import {ProductDetailsComponent} from './product/product-details/product-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: UserRegisterComponent},
  { path: 'events-overview', component: EventsOverviewComponent},
  { path: 'categories-overview', component: CategoriesOverviewComponent },
  { path: 'category-proposals', component: CategoryProposalsComponent },
  { path: 'edit-category/:id', component: EditCategoryComponent },
  { path: 'create-category', component: CreateCategoryComponent },
  { path: 'products-overview', component: ProductsOverviewComponent},
  { path: 'product-details/:id', component: ProductDetailsComponent},
  { path: 'services-overview', component: ServicesOverviewComponent},
  { path: 'manageable-services', component: ManageableServicesComponent },
  { path: 'service-details/:id', component: ServiceDetailsComponent },
  { path: 'quick-registration/:hash', component: QuickRegistrationComponent, canActivate: [QuickRegistrationGuard]},
  { path: 'edit-service/:id', component: EditServiceComponent },
  { path: 'create-service', component: CreateServiceComponent },
  {
    path: 'event-invitations',
    component: EventInvitationsComponent,
    canActivate: [NavigationGuard],
    data: {
      allowedUrls: ['/create-event'],
      fallback: "/home"
    }
  },
  { path: 'company-register', component: CompanyRegisterComponent},
  { path: 'create-event-type', component: CreateEventTypeComponent},
  { path: 'create-event', component: CreateEventComponent},
  {
    path: 'budget-planning',
    component: BudgetPlanningComponent,
    canActivate: [NavigationGuard],
    data: {
      allowedUrls: ['/create-event', '/event-invitations'],
      fallback: "/home"
    }
  },
  { path: 'edit-event-type/:id', component: EditEventTypeComponent},
  {
    path: 'event-agenda',
    component: EventAgendaComponent,
    canActivate: [NavigationGuard],
    data: {
      allowedUrls: ['/budget-planning'],
      fallback: '/home',
    }
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
