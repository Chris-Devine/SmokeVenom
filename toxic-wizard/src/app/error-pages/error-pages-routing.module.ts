import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Error403Component } from './error-403/error-403.component';
import { Error404Component } from './error-404/error-404.component';
import { Error500Component } from './error-500/error-500.component';



const routes: Routes = [
  {
    path: '403',
    component: Error403Component,
    data: {
      title: 'No Unauthorised Access Allowed'
    }
  },
  {
    path: '404',
    component: Error404Component,
    data: {
      title: 'Loading Overlay Example'
    }
  },
  {
    path: '500',
    component: Error500Component,
    data: {
      title: 'Internal Server Error'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ErrorPagesRoutingModule { }