import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { ManageableServicesComponent } from './service/manageable-services/manageable-services.component';
import { ServiceDetailsComponent } from './service/service-details/service-details.component';
import { EditServiceComponent } from './service/edit-service/edit-service.component';
import { CreateServiceComponent } from './service/create-service/create-service.component';
import { EventsOverviewComponent } from './event/events-overview/events-overview.component';
import { UserRegisterComponent } from './auth/user-register/user-register.component';
import { CompanyRegisterComponent } from './company/company-register/company-register.component';
import { ProductsOverviewComponent } from './product/products-overview/products-overview.component';
import { ServicesOverviewComponent } from './service/services-overview/services-overview.component';
import { CategoriesOverviewComponent } from './category/categories-overview/categories-overview.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { CategoryProposalsComponent } from './category/category-proposals/category-proposals.component';
import { CreateEventTypeComponent } from './event-type/create-event-type/create-event-type.component'
import { EditEventTypeComponent } from './event-type/edit-event-type/edit-event-type.component';
import { EventInvitationsComponent } from './event/event-invitations/event-invitations.component';
import { CreateEventComponent } from './event/create-event/create-event.component';
import { QuickRegistrationComponent } from './auth/quick-registration/quick-registration.component';
import { QuickRegistrationGuard } from './auth/guards/quick-registration.guard';
import { EventAgendaComponent } from './event/event-agenda/event-agenda.component';
import { BudgetPlanningComponent } from './budget/budget-planning/budget-planning.component';
import { NavigationGuard } from './infrastructure/navigation/guards/navigation.guard';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { PriceListComponent } from './price-list/price-list/price-list.component';
import { ErrorComponent } from './shared/error/error.component';
import { AccountDetailsComponent } from './user/account-details/account-details.component';
import { EditAccountComponent } from './user/edit-account/edit-account.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { ManageReportsComponent } from './user/manage-reports/manage-reports.component';
import { EventTypesOverviewComponent } from './event-type/event-types-overview/event-types-overview.component';
import { ProviderCompanyComponent } from './company/provider-company/provider-company.component';
import { EditCompanyComponent } from './company/edit-company/edit-company.component';
import { EventDetailsComponent } from './event/event-details/event-details.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { CompanyDetailsComponent } from './company/company-details/company-details.component';
import { FavouritesComponent } from './favourites/favourites/favourites.component';
import { NotificationsComponent } from './web-socket/notifications/notifications.component';
import { ManageableProductsComponent } from './product/manageable-products/manageable-products.component';
import { ReviewableSolutionsComponent } from './review/reviewable-solutions/reviewable-solutions.component';
import { ManageCommentsComponent } from './review/manage-comments/manage-comments.component';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { UserInvitationsComponent } from './event/user-invitations/user-invitations.component';
import { ManageableEventsComponent } from './event/manageable-events/manageable-events.component';
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { ManageReservationsComponent } from './service/manage-reservations/manage-reservations.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { ChatComponent } from './chat/chat/chat.component';
import { PastEventsOverviewComponent } from './event/past-events-overview/past-events-overview.component';
import { EventRatingStatisticsComponent } from './event/event-rating-statistics/event-rating-statistics.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: UserRegisterComponent},
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [AuthGuard],
    data: { role: ['EVENT_ORGANIZER', 'PROVIDER', 'ADMIN'] }
  },
  { path: 'events-overview', component: EventsOverviewComponent},
  {
    path: 'categories-overview',
    component: CategoriesOverviewComponent,
    canActivate: [AuthGuard],
    data: { role: ['ADMIN'] }
  },
  {
    path: 'category-proposals',
    component: CategoryProposalsComponent,
    canActivate: [AuthGuard],
    data: { role: ['ADMIN'] }
  },
  {
    path: 'edit-category/:id',
    component: EditCategoryComponent,
    canActivate: [AuthGuard],
    data: { role: ['ADMIN'] }
  },
  {
    path: 'create-category',
    component: CreateCategoryComponent,
    canActivate: [AuthGuard],
    data: { role: ['ADMIN'] }
  },
  { path: 'products-overview', component: ProductsOverviewComponent},
  { path: 'product-details/:id', component: ProductDetailsComponent},
  { path: 'services-overview', component: ServicesOverviewComponent},
  {
    path: 'manageable-services',
    component: ManageableServicesComponent,
    canActivate: [AuthGuard],
    data: { role: ['PROVIDER'] }
  },
  {
    path: 'manageable-products',
    component: ManageableProductsComponent,
    canActivate: [AuthGuard],
    data: { role: ['PROVIDER'] }
  },
  {
    path: 'manageable-events',
    component: ManageableEventsComponent,
    canActivate: [AuthGuard],
    data: { role: ['EVENT_ORGANIZER'] }
  },
  { path: 'service-details/:id', component: ServiceDetailsComponent },
  { path: 'quick-registration/:hash', component: QuickRegistrationComponent, canActivate: [QuickRegistrationGuard]},
  {
    path: 'edit-service/:id',
    component: EditServiceComponent,
    canActivate: [AuthGuard],
    data: { role: ['PROVIDER'] }
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent,
    canActivate: [AuthGuard],
    data: { role: ['PROVIDER']}
  }, 
  {
    path: 'create-service',
    component: CreateServiceComponent,
    canActivate: [AuthGuard],
    data: { role: ['PROVIDER'] }
  },
  {
    path: 'create-product',
    component: CreateProductComponent,
    canActivate: [AuthGuard],
    data: { role: ['PROVIDER'] }
  },
  {
    path: 'price-list',
    component: PriceListComponent,
    canActivate: [AuthGuard],
    data: { role: ['PROVIDER'] }
  },
  {
    // Event organizer can rate and comment on purchased / reserved solutions
    path: 'reviewable-solutions',
    component: ReviewableSolutionsComponent,
    canActivate: [AuthGuard],
    data: { role: ['EVENT_ORGANIZER'] }
  },
  {
    path: 'report-management',
    component: ManageReportsComponent,
    canActivate: [AuthGuard],
    data: { role: ['ADMIN'] }
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
    data: { role: ['EVENT_ORGANIZER', 'PROVIDER', 'ADMIN'] }
  },
  {
    path: 'comment-management',
    component: ManageCommentsComponent,
    canActivate: [AuthGuard],
    data: { role: ['ADMIN'] }
  },
  {
    path: 'reservation-management',
    component: ManageReservationsComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['PROVIDER']
    }
  },
  {
    path: 'past-events-overview',
    component: PastEventsOverviewComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ADMIN', 'EVENT_ORGANIZER']
    }
  },
  {
    path: 'event-invitations/:id',
    component: EventInvitationsComponent,
    canActivate: [NavigationGuard, AuthGuard],
    data: {
      role: ['EVENT_ORGANIZER'],
      allowedUrls: ['/event-agenda'],
      fallback: "/home"
    }
  },
  {
    path: 'event-stats/:id',
    component: EventRatingStatisticsComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ADMIN', 'EVENT_ORGANIZER']
    }
  },
  {path: ':provider-id/company-register', component: CompanyRegisterComponent},
  {
    path: 'create-event-type',
    component: CreateEventTypeComponent,
    canActivate: [AuthGuard],
    data: { role: ['ADMIN'] }
  },
  {
    path: 'create-event',
    component: CreateEventComponent,
    canActivate: [AuthGuard],
    data: { role: ['EVENT_ORGANIZER'] }
  },
  {
    path: 'budget-planning/:id',
    component: BudgetPlanningComponent,
    canActivate: [NavigationGuard, AuthGuard],
    data: {
      role: ['EVENT_ORGANIZER'],
      allowedUrls: ['/create-event', '/product-details', '/service-details'],
      fallback: "/home"
    }
  },
  { path: 'edit-event/:id', component: EditEventComponent },
  {
    path: 'event-types',
    component: EventTypesOverviewComponent,
    canActivate: [AuthGuard],
    data: { role: ['ADMIN'] }
  },
  {
    path: 'edit-event-type/:id',
    component: EditEventTypeComponent,
    canActivate: [AuthGuard],
    data: { role: ['ADMIN'] }
  },
  {
    path: 'event-agenda/:id',
    component: EventAgendaComponent,
    canActivate: [NavigationGuard, AuthGuard],
    data: {
      role: ['EVENT_ORGANIZER'],
      allowedUrls: ['/budget-planning'],
      fallback: '/home',
    }
  },
  { path: 'event-details/:id', component: EventDetailsComponent },
  {
    path: 'account-details', component: AccountDetailsComponent,
    canActivate: [AuthGuard],
    data: { role: ['ADMIN', 'EVENT_ORGANIZER', 'PROVIDER'] }
  },
  {
    path: 'edit-account',
    component: EditAccountComponent,
    canActivate: [AuthGuard],
    data: { role: ['ADMIN', 'EVENT_ORGANIZER', 'PROVIDER'] }
  },
  { path: 'user-profile/:id', component: UserProfileComponent },
  {
    path: 'favourites', component: FavouritesComponent,
    canActivate: [AuthGuard],
    data: { role: ['ADMIN', 'EVENT_ORGANIZER', 'PROVIDER'] }
  },
  {
    path: 'provider-company', component: ProviderCompanyComponent,
    canActivate: [AuthGuard],
    data: { role: ['PROVIDER'] }
  },
  { path: 'company/:id', component: CompanyDetailsComponent },
  {
    path: 'edit-company', component: EditCompanyComponent,
    canActivate: [AuthGuard],
    data: { role: ['PROVIDER'] }
  },
  {
    path: 'user-invitations', component: UserInvitationsComponent,
    canActivate: [AuthGuard],
    data: { role: ['EVENT_ORGANIZER', 'PROVIDER', 'ADMIN'] }
  },
  {
    path: 'chat', component: ChatComponent,
    canActivate: [AuthGuard],
    data: { role: ['EVENT_ORGANIZER', 'PROVIDER', 'ADMIN'] }
  },
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
