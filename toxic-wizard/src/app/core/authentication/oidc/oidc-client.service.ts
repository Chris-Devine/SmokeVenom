import { Injectable } from '@angular/core';
import { UserManager, MetadataService, User } from 'oidc-client';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment'

import { LoggerService } from '../../logger/logger.service'
import { CurrentUserService } from '../..//current-user/current-user.service'

@Injectable()
export class OidcClientService {

  private _serviceTag: string = 'OidcClientService'
  public user: User = null;

  private _userManager: UserManager;

  constructor(
    private _router: Router,
    private _loggerService: LoggerService,
    private _currentUserService: CurrentUserService
  ) {
    this._userManager = new UserManager(config);

    let self = this;

    this._userManager.events.addAccessTokenExpired(function () {
      self._loggerService.debug(self._serviceTag, "token expired");
    });

    this._userManager.events.addSilentRenewError(function (e) {
      self._currentUserService.resetCurrentUser();
      self._loggerService.error(self._serviceTag, "silent renew error", e.message);
    });

    this._userManager.events.addUserLoaded(function (user) {
      console.log("user loaded", user);
      self._currentUserService.setCurrentUser(user);
    });

    this._loggerService.info(this._serviceTag, 'has initialised');
  }

  public login() {
    this._userManager.signinRedirect();
  }

  public logout() {
    if (this._currentUserService.resetCurrentUser()) {
      this._userManager.signoutRedirect()
    }
  }

  public callback() {
    let self = this;

    this._userManager.signinRedirectCallback().then(function (user) {
      //self._currentUserService.setCurrentUser(user);
      self._router.navigateByUrl('/home');
    }).catch(function (err) {
      self._loggerService.error(self._serviceTag, 'callback error', err)
      throw err
    });
  }

  public silentcallback() {
    let self = this;
    this._userManager.signinSilentCallback().catch(function (err) {
      self._loggerService.error(self._serviceTag, 'silent callback error', err)
      throw err
    });
  }

  public getUser(): Promise<User> {
    return this._userManager.getUser().then(function (user) {
      if (user) {
        return user
      }
      else {
        return user
      }
    });
  }


}

const config: any = {
  authority: environment.identityServerAuthority,
  client_id: "futureproofui",
  redirect_uri: environment.identityServerRedirectUri,
  response_type: "id_token token",
  scope: environment.identityServerScope,

  // accessTokenExpiringNotificationTime: how many seconds before token exspires should i fire a silent renew event 
  accessTokenExpiringNotificationTime: 70,
  silent_redirect_uri: environment.identityServerSilentRedirectUri,
  automaticSilentRenew: true,

  //post_logout_redirect_uri : "http://localhost:5003/index.html",
};