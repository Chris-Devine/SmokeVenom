import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { AuthorisationGuardService } from './shared/services/security/authorisation-guard.service';

import { AppComponent } from './app.component';



const routes: Routes = [
  { path: '', redirectTo: '/home/overview', pathMatch: 'full' },

  /*MUST BE AT THE BOTTOM OF ARRAY*/
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    //AuthorisationGuardService
  ]
})

export class AppRoutingModule { }