import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module'
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';

import { NavbarComponent } from './navbar.component';
import { NavbarSecurityPolicyService } from './security-policy/navbar-security-policy.service'
import { UserDropdownComponent } from './user-dropdown/user-dropdown.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [
    NavbarSecurityPolicyService
  ],
  declarations: [
    NavbarComponent,
    UserDropdownComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
