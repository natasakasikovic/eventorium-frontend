import { NgModule } from '@angular/core';
import { BrowserModule, EventManager } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutModule } from './layout/layout.module';
import { provideHttpClient } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './product/product.module';
import { EventModule } from './event/event.module';
import { ServiceModule } from './service/service.module';

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
    ServiceModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
