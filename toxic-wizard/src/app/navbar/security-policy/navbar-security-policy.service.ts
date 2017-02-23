import { Injectable } from '@angular/core';
import * as _ from "lodash";

import { Constants } from '../../core/constants/constants'

import { LoggerService } from '../../core/logger/logger.service'
import { CurrentUserService } from '../../core/current-user/current-user.service'

import { CurrentUser } from '../../core/current-user/models/current-user'
import { NavbarSecurityPolicy } from './navbar-security-policy.enum'

@Injectable()
export class NavbarSecurityPolicyService {

  private _serviceTag: string = "NavbarSecurityPolicyService";

  private _navbarSecurityPolicies: Array<NavbarSecurityPolicy>;


  constructor(
    private _loggerService: LoggerService,
    private _currentUserService: CurrentUserService,
    private _constants: Constants
  ) {
    _loggerService.info(this._serviceTag, 'has initialised');
  }

  public getSecurityPolicies(): Array<NavbarSecurityPolicy> {
    this._navbarSecurityPolicies = new Array<NavbarSecurityPolicy>();

    if (this._currentUserService.isLoggedIn()) {
      let tempCurrentUser: CurrentUser = this._currentUserService.currentUser;

      this.canUseViability(tempCurrentUser);
    }
    return this._navbarSecurityPolicies;
  }

  private canUseViability(tempCurrentUser: CurrentUser): void {
    if (typeof tempCurrentUser.product !== "undefined" && typeof tempCurrentUser.viabilityAccess !== "undefined") {
      
      let hasProductViability: boolean = _.includes(tempCurrentUser.product, this._constants.product.viability);
      let viabilityClaimsLength: number = tempCurrentUser.viabilityAccess.length

      if (hasProductViability && viabilityClaimsLength > 0) {
        if (!_.includes(this._navbarSecurityPolicies, NavbarSecurityPolicy.canUseViability)) {
          this._navbarSecurityPolicies.push(NavbarSecurityPolicy.canUseViability);
        }
      }
    }
  }

}


