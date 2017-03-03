import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CoreModule } from './core/core.module'
import { ErrorPagesModule } from './error-pages/error-pages.module'
import { SharedModule } from './shared/shared.module'
import { AppRoutingModule } from './app-routing.module';
import { NavbarModule } from './navbar/navbar.module'
import { LoginCallbacksModule } from './login-callbacks/login-callbacks.module'

import { HomeModule } from './home/home.module';
import { ViabilityModule } from './viability/viability.module'

import { AppComponent } from './app.component';
import { CodeExamplesModule } from './code-examples/code-examples.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    ErrorPagesModule,
    LoginCallbacksModule,
    NavbarModule,
    CodeExamplesModule,
    HomeModule,
    ViabilityModule,
    CoreModule,
    SharedModule,

    AppRoutingModule
  ],
  providers: [],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
