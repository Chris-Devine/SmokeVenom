import { Injectable } from '@angular/core';
import { User } from 'oidc-client';
import { JwtHelper } from 'angular2-jwt';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LoggerService } from '../logger/logger.service'

import { CurrentUser } from './models/current-user'
import { DecodedAccessToken } from './models/decoded-access-token'
import { IdentityServerUserProfile } from './models/identity-server-user-profile'

@Injectable()
export class CurrentUserService {

  private _serviceTag: string = "CurrentUserService";

  public _currentUser: CurrentUser = new CurrentUser();
  public get currentUser(): CurrentUser {
    return this._currentUser;
  }

  public currentUserState: Subject<CurrentUser> = new BehaviorSubject<CurrentUser>(this._currentUser);

  constructor(
    private _loggerService: LoggerService,
    private _jwtHelper: JwtHelper
  ) {
    _loggerService.info(this._serviceTag, 'has initialised');
  }

  public setCurrentUser(identityServerUser: User): void {
    this._currentUser = this.populateCurrentUser(identityServerUser);
    this._loggerService.debug(this._serviceTag, 'Current user is:', this._currentUser)
    this.changeCurrentUserState();
  }

  public resetCurrentUser(): boolean {
    this._currentUser.clean();
    this.changeCurrentUserState();
    return true;
  }

  public isLoggedIn(): boolean {
    if (!!this._currentUser.accessToken && this._currentUser.accessToken != '') {
      try {
        let jwtHelper: JwtHelper = new JwtHelper();
        return !jwtHelper.isTokenExpired(this._currentUser.accessToken);
      } catch (error) {
        this._loggerService.error(this._serviceTag, 'The access token caused an error when using "JwtHelper.isTokenExpired"', this._currentUser.accessToken)
        throw (error)
      }
    }
    else {
      return false
    }
  }

  // I turn an OIDC DTO to CurrentUser Type
  private populateCurrentUser(identityServerUser: User): CurrentUser {
    let tempCurrentUser: CurrentUser = new CurrentUser();
    let decodedAccessToken: DecodedAccessToken = this.decodeAccessToken(identityServerUser.access_token);
    let identityServerUserProfile: IdentityServerUserProfile = identityServerUser.profile;

    tempCurrentUser.userName = identityServerUserProfile.name;
    tempCurrentUser.accessToken = identityServerUser.access_token;
    tempCurrentUser.idToken = identityServerUser.id_token;
    tempCurrentUser.role = decodedAccessToken.role;
    tempCurrentUser.product = decodedAccessToken.product;
    tempCurrentUser.viabilityAccess = decodedAccessToken.viability_access;

    return tempCurrentUser
  }

  private changeCurrentUserState():void{
    this.currentUserState.next(this._currentUser);
  }

  // I decode a OWIN access token into an object of type DecodedAccessToken
  private decodeAccessToken(accessToken: string): DecodedAccessToken {
    return this._jwtHelper.decodeToken(accessToken);
  }

}
