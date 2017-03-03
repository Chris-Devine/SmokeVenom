import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReactiveFormsExamplesRouting } from './reactive-forms-examples/reactive-forms-examples-routing.module'

import { CodeExamplesComponent } from './code-examples.component';
import { OverviewComponent } from './overview/overview.component';



const routes: Routes = [
  {
    path: 'code-examples',
    component: CodeExamplesComponent,
    data: {
      title: 'Code Examples'
    },
    children: [
      { path: 'reactive-forms', children: ReactiveFormsExamplesRouting }
      ,
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: OverviewComponent,
        data: {
          title: 'Overview'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class CodeExamplesRoutingModule { }