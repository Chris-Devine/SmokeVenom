/* tslint:disable:no-unused-variable */

import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { JwtHelper } from 'angular2-jwt';

import { LoggerService } from '../../core/logger/logger.service'
import { CurrentUserService } from '../../core/current-user/current-user.service';
import { ViabilityAuthGuardService } from './viability-auth-guard.service';

import { CurrentUser } from '../../core/current-user/models/current-user'
import { Constants } from '../../core/constants/constants'

describe('ViabilityAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        JwtHelper,
        LoggerService,
        CurrentUserService,
        ViabilityAuthGuardService,
        Constants
      ]
    });
    spyOn(LoggerService.prototype, 'info');
    spyOn(LoggerService.prototype, 'debug');
  });

  it('should ...', inject([ViabilityAuthGuardService], (service: ViabilityAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
