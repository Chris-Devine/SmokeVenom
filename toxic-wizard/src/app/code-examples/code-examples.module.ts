import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'
// ReactiveFormsModule is needed for forms validation
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormsExamplesModule } from './reactive-forms-examples/reactive-forms-examples.module'

import { CodeExamplesRoutingModule } from './code-examples-routing.module'
import { SidebarComponent } from './sidebar/sidebar.component'
import { OverviewComponent } from './overview/overview.component';
import { CodeExamplesComponent } from './code-examples.component'



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsExamplesModule,
    CodeExamplesRoutingModule
  ],
  declarations: [
    OverviewComponent,
    SidebarComponent,
    CodeExamplesComponent
  ]
})
export class CodeExamplesModule { }
