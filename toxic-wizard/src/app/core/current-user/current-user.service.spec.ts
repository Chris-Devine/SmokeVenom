/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { JwtHelper } from 'angular2-jwt';

import { LoggerService } from '../logger/logger.service'
import { CurrentUserService } from './current-user.service';

import { User } from 'oidc-client';
import { CurrentUser } from './models/current-user'
import { DecodedAccessToken } from './models/decoded-access-token'
import { IdentityServerUserProfile } from './models/identity-server-user-profile'

describe('CurrentUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JwtHelper,
        LoggerService,
        CurrentUserService
      ]
    });
    spyOn(LoggerService.prototype, 'info');
    spyOn(LoggerService.prototype, 'debug');
  });

  it('should ...', inject([CurrentUserService], (service: CurrentUserService) => {
    expect(service).toBeTruthy();
  }));

  describe('isLoggedIn', () => {
    let jwtHelperisTokenExpiredSpyOn: jasmine.Spy;

    beforeEach(() => {
      jwtHelperisTokenExpiredSpyOn = spyOn(JwtHelper.prototype, 'isTokenExpired');
    });

    it('if access token is null return false', inject([CurrentUserService], (service: CurrentUserService) => {

      service._currentUser.accessToken = null

      expect(service.isLoggedIn()).toBe(false);
    }));

    it('if access token is empty string return false', inject([CurrentUserService], (service: CurrentUserService) => {
      service._currentUser.accessToken = ''

      expect(service.isLoggedIn()).toBe(false);
    }));

    it('if access token is not empty or null, call jwt helper to find out if access token is expired. Its expired return false', inject([CurrentUserService], (service: CurrentUserService) => {
      let accessTokenTest: string = 'test';
      service._currentUser.accessToken = accessTokenTest;
      jwtHelperisTokenExpiredSpyOn.and.returnValue(true);

      expect(service.isLoggedIn()).toBe(false);
      expect(JwtHelper.prototype.isTokenExpired).toHaveBeenCalled();
      expect(JwtHelper.prototype.isTokenExpired).toHaveBeenCalledTimes(1);
      expect(JwtHelper.prototype.isTokenExpired).toHaveBeenCalledWith(accessTokenTest);
    }));

    it('if access token is not empty or null, call jwt helper to find out if access token is expired. Its not expired return true', inject([CurrentUserService], (service: CurrentUserService) => {
      let accessTokenTest: string = 'test';
      service._currentUser.accessToken = accessTokenTest;
      jwtHelperisTokenExpiredSpyOn.and.returnValue(false);

      expect(service.isLoggedIn()).toBe(true);
      expect(JwtHelper.prototype.isTokenExpired).toHaveBeenCalled();
      expect(JwtHelper.prototype.isTokenExpired).toHaveBeenCalledTimes(1);
      expect(JwtHelper.prototype.isTokenExpired).toHaveBeenCalledWith(accessTokenTest);
    }));

  });

  describe('setCurrentUser', () => {
    let jwtHelperisDecodeToken: jasmine.Spy;
    let identityServerUserProfile: IdentityServerUserProfile;
    let decodedAccessTokenForSpy: DecodedAccessToken;
    let userOidc: User;

    beforeEach(() => {
      jwtHelperisDecodeToken = spyOn(JwtHelper.prototype, 'decodeToken');
      identityServerUserProfile = {
        amr: ['amr', 'Test'],
        auth_time: 1,
        idp: 'idpTest',
        name: 'name@test.com',
        sid: 'sidTest',
        sub: 'subTest'
      }
      userOidc = ({
        id_token: 'idTokenTest',
        access_token: 'accessTokenTest',
        token_type: 'tokenTypeTest',
        profile: identityServerUserProfile,
        session_state: 'sessionStateTest',
        state: 'stateTest',
        scope: 'scopeTest',
        scopes: ['scopes', 'Test'],
        expires_in: 1,
        expires_at: 1,
        expired: true,
        toStorageString: () => 'toStorageStringTest'
      })
      decodedAccessTokenForSpy = {
        client_id: 'clientIdTest',
        scope: 'scopeTest',
        role: ['role', 'test'],
        product: ['product', 'test'],
        viability_access: ['viabilityAccess', 'test'],
        idp: 'idpTest',
        iss: 'issTest',
        sub: 'subString',
        amr: 'amrTest',
        aud: 'audTest',
        exp: 1,
        nbf: 1,
        auth_time: 1
      }
    });

    it('if pass in correct variable of type "User", then expect "currentUser" to be set', inject([CurrentUserService], (service: CurrentUserService) => {
      jwtHelperisDecodeToken.and.returnValue(decodedAccessTokenForSpy);

      service.setCurrentUser(userOidc);

      expect(service._currentUser.accessToken).toBe(userOidc.access_token);
      expect(service._currentUser.idToken).toBe(userOidc.id_token);
      expect(service._currentUser.product).toBe(decodedAccessTokenForSpy.product);
      expect(service._currentUser.role).toBe(decodedAccessTokenForSpy.role);
      expect(service._currentUser.userName).toBe(identityServerUserProfile.name);
      expect(service._currentUser.viabilityAccess).toBe(decodedAccessTokenForSpy.viability_access);
    }));

    it('if pass in correct variable of type "User", then expect "currentUser" to be set and for a behaviour subject of the services currentUser to be emited', inject([CurrentUserService], (service: CurrentUserService) => {
      jwtHelperisDecodeToken.and.returnValue(decodedAccessTokenForSpy);

      let currentUserEmitted: CurrentUser = new CurrentUser();

      service.currentUserState.subscribe((currentUserState) => {
        currentUserEmitted = currentUserState
      });

      service.setCurrentUser(userOidc);

      expect(currentUserEmitted.accessToken).toBe(userOidc.access_token);
      expect(currentUserEmitted.idToken).toBe(userOidc.id_token);
      expect(currentUserEmitted.product).toBe(decodedAccessTokenForSpy.product);
      expect(currentUserEmitted.role).toBe(decodedAccessTokenForSpy.role);
      expect(currentUserEmitted.userName).toBe(identityServerUserProfile.name);
      expect(currentUserEmitted.viabilityAccess).toBe(decodedAccessTokenForSpy.viability_access);

    }));

  });

  describe('resetCurrentUser', () => {

    it('When called all properties of "CurrentUser" are set to empty', inject([CurrentUserService], (service: CurrentUserService) => {
      spyOn(CurrentUser.prototype, 'clean').and.callThrough();

      service._currentUser.accessToken = 'accessTokenTest';
      service._currentUser.idToken = 'idTokenTest';
      service._currentUser.product = ['productTest'];
      service._currentUser.role = ['roleTest'];
      service._currentUser.userName = 'userNameTest';
      service._currentUser.viabilityAccess = ['viabilityAccessTest'];

      service.resetCurrentUser();
      
      expect(service.currentUser.accessToken).toBe('');
      expect(service.currentUser.idToken).toBe('');
      expect(service.currentUser.userName).toBe('');
      expect(service.currentUser.viabilityAccess).toEqual([]);
      expect(service.currentUser.product).toEqual([]);
      expect(service.currentUser.role).toEqual([]);
    }));

    it('When called all properties of "CurrentUser" are set to empty and for a behaviour subject of the services currentUser to be emited', inject([CurrentUserService], (service: CurrentUserService) => {
      spyOn(CurrentUser.prototype, 'clean').and.callThrough();

      service._currentUser.accessToken = 'accessTokenTest';
      service._currentUser.idToken = 'idTokenTest';
      service._currentUser.product = ['productTest'];
      service._currentUser.role = ['roleTest'];
      service._currentUser.userName = 'userNameTest';
      service._currentUser.viabilityAccess = ['viabilityAccessTest'];

      let currentUserEmitted: CurrentUser = service.currentUser;

      service.currentUserState.subscribe((currentUserState) => {
        currentUserEmitted = currentUserState
      });

      service.resetCurrentUser();

      expect(currentUserEmitted.accessToken).toBe('');
      expect(currentUserEmitted.idToken).toBe('');
      expect(currentUserEmitted.userName).toBe('');
      expect(currentUserEmitted.viabilityAccess).toEqual([]);
      expect(currentUserEmitted.product).toEqual([]);
      expect(currentUserEmitted.role).toEqual([]);
    }));


  });

});
