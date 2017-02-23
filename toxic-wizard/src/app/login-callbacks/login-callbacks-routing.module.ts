import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StandardLoginCallbackComponent } from './standard-login-callback/standard-login-callback.component';
import { SilentLoginCallbackComponent } from './silent-login-callback/silent-login-callback.component';

const routes: Routes = [
  {
    path: 'logincallback',
    component: StandardLoginCallbackComponent,
    data: {
      title: 'Login Callback'
    }
  },
  {
    path: 'silentlogincallback',
    component: SilentLoginCallbackComponent,
    data: {
      title: 'Silent Login Callback'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    //AuthorisationGuardService
  ]
})

export class LoginCallbacksRoutingModule { }