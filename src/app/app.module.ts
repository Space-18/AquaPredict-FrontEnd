import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { AuthInterceptor } from './core/interceptors/auth/auth.interceptor';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler/error-handler.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HighlightDirective,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
