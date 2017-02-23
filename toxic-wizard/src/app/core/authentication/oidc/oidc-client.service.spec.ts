/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { JwtHelper } from 'angular2-jwt';

import { LoggerService } from '../../logger/logger.service'
import { CurrentUserService } from '../..//current-user/current-user.service'
import { OidcClientService } from './oidc-client.service';

describe('OidcClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        JwtHelper,
        LoggerService,
        OidcClientService,
        CurrentUserService
      ]
    });

    spyOn(LoggerService.prototype, 'info')
  });

  it('should ...', inject([OidcClientService], (service: OidcClientService) => {
    expect(service).toBeTruthy();
  }));

  //TODO: Figure out if we can unit test this service, due to not injecting the usermanager for the oidc service

});
