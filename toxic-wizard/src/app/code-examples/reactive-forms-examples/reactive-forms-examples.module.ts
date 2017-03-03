import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module'
// ReactiveFormsModule is needed for forms validation
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { ReactiveFormsExamplesRoutingModule } from './reactive-forms-examples-routing.module'

import { OverviewComponent } from './overview/overview.component'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    //ReactiveFormsExamplesRoutingModule
  ],
  declarations: [
    OverviewComponent
  ]
})
export class ReactiveFormsExamplesModule { }
