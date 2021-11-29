import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/// Common modules
import { MatSnackBarModule } from '@angular/material/snack-bar';

/// Interceptors
import { ErrorInterceptor, fakeBackendProvider, JwtInterceptor } from './interceptors';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/// Services
import { ObserveService } from './services';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
    ObserveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
