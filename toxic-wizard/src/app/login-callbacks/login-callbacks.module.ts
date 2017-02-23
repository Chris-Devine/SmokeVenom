import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginCallbacksRoutingModule } from './login-callbacks-routing.module'

import { StandardLoginCallbackComponent } from './standard-login-callback/standard-login-callback.component';
import { SilentLoginCallbackComponent } from './silent-login-callback/silent-login-callback.component';

@NgModule({
  imports: [
    CommonModule,
    LoginCallbacksRoutingModule
  ],
  declarations: [
    StandardLoginCallbackComponent,
    SilentLoginCallbackComponent
    ]
})
export class LoginCallbacksModule { }
