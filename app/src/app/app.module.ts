import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScannerComponent } from './scanner/scanner.component';
import { ListComponent } from './list/list.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Error404Component } from './error404/error404.component';

// Services
import { AuthService } from './_services/auth.service';
import { ShoppingListService } from './_services/shopping-list.service';
import { ProfileService } from './_services/profile.service';
import { TokenInterceptorService } from './_services/token-interceptor.service';
import { UnauthInterceptorService } from './_services/unauth-interceptor.service';

// Guards
import { AuthGuard } from './_guards/auth.guard';

// Service worker
// import { ServiceWorkerModule } from '@angular/service-worker';

// Environment
// import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ScannerComponent,
    ListComponent,
    AddItemComponent,
    ProfileComponent,
    SettingsComponent,
    Error404Component,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AuthService,
    ShoppingListService,
    ProfileService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
