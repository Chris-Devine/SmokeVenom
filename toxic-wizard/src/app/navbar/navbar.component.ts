import { Component, OnInit } from '@angular/core';

import { OidcClientService } from '../core/authentication/oidc/oidc-client.service';
import { LoggerService } from '../core/logger/logger.service'
import { CurrentUserService } from '../core/current-user/current-user.service'
import { NavbarSecurityPolicyService } from './security-policy/navbar-security-policy.service'

import { UserDropdownComponent } from './user-dropdown/user-dropdown.component';

import { NavbarSecurityPolicy } from './security-policy/navbar-security-policy.enum'


import * as _ from "lodash";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private _serviceTag = 'NavbarComponent';
  private _securityPolicies: Array<NavbarSecurityPolicy>;

  public canUseViabilityPolicy: boolean = false;
  public userIsLoggedIn: boolean;

  constructor(
    private _loggerService: LoggerService,
    private _oidcClientService: OidcClientService,
    private _currentUserService: CurrentUserService,
    private _navbarSecurityPolicyService: NavbarSecurityPolicyService
  ) { }

  ngOnInit() {
    this.subscribeToCurrentUserState();
    this.setSecurityPolicies();
  }

  public redirectToLogin(): void {
    this._oidcClientService.login()
  }

  private subscribeToCurrentUserState() {
    this._currentUserService.currentUserState.subscribe((currentUserState) => {
      this._loggerService.debug(this._serviceTag, "current user state change:", currentUserState);
      this._loggerService.debug(this._serviceTag, "current user logged in:" + this._currentUserService.isLoggedIn());
      this.userIsLoggedIn = this._currentUserService.isLoggedIn();
      this.setSecurityPolicies();
    });
  }

  private setSecurityPolicies() {
    this.getSecurityPolicies();

    this.canUseViabilityPolicy = _.includes(this._securityPolicies, NavbarSecurityPolicy.canUseViability);
  }

  private getSecurityPolicies() {
    this._securityPolicies = this._navbarSecurityPolicyService.getSecurityPolicies();
  }

}
