import { NgModule } from '@angular/core';
import { BrowserModule, EventManager } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './auth/auth.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './product/product.module';
import { EventModule } from './event/event.module';
import { ServiceModule } from './service/service.module';
import {CategoryModule} from './category/category.module';
import { EventTypeModule } from './event-type/event-type.module';

import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi} from '@angular/common/http';
import {Interceptor} from './auth/interceptor';
import {BudgetModule} from './budget/budget.module';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PriceListModule} from './price-list/price-list.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    AuthModule,
    MatSidenavModule,
    SharedModule,
    ProductModule,
    EventModule,
    ServiceModule,
    CategoryModule,
    EventTypeModule,
    BudgetModule,
    PriceListModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    provideHttpClient(withFetch(), withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
