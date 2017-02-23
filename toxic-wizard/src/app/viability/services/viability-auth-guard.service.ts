import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import * as _ from "lodash";

import { CurrentUserService } from '../../core/current-user/current-user.service';

import { CurrentUser } from '../../core/current-user/models/current-user'
import { Constants } from '../../core/constants/constants'

@Injectable()
export class ViabilityAuthGuardService implements CanActivate {

  constructor(
    private _currentUserService: CurrentUserService,
    private router: Router,
    private _constants: Constants) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let canUseViability: boolean = false;

    if (this._currentUserService.isLoggedIn()) {
      canUseViability = this.canUseViability(this._currentUserService.currentUser)
    }

    if(canUseViability)
    {
      return true;
    }
    this.router.navigate(['/403']);
    return false;
  }

  private canUseViability(tempCurrentUser: CurrentUser): boolean {
    if (typeof tempCurrentUser.product !== "undefined" && typeof tempCurrentUser.viabilityAccess !== "undefined") {
      let hasProductViability: boolean = _.includes(tempCurrentUser.product, this._constants.product.viability);
      let viabilityClaimsLength: number = tempCurrentUser.viabilityAccess.length
      if (hasProductViability && viabilityClaimsLength > 0) {
        return true;
      }
    }
    return false
  }
}