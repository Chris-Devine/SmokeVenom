/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NavbarSecurityPolicyService } from './navbar-security-policy.service';
import { JwtHelper } from 'angular2-jwt';

import { LoggerService } from '../../core/logger/logger.service'
import { CurrentUserService } from '../../core/current-user/current-user.service'

import { CurrentUser } from '../../core/current-user/models/current-user'
import { NavbarSecurityPolicy } from './navbar-security-policy.enum'
import { Constants } from '../../core/constants/constants'

describe('NavbarSecurityPolicyService', () => {

  describe('basics', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [

        ],
        providers: [
          LoggerService,
          NavbarSecurityPolicyService,
          CurrentUserService,
          JwtHelper,
          Constants
        ]
      });
      spyOn(LoggerService.prototype, 'info');
      spyOn(LoggerService.prototype, 'debug');

    });

    it('should ...', inject([NavbarSecurityPolicyService], (service: NavbarSecurityPolicyService) => {
      expect(service).toBeTruthy();
    }));

  });

  describe('getSecurityPolicies', () => {


    describe('no current user', () => {
      let currentUserService_isLoggedIn: jasmine.Spy;
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
          ],
          providers: [
            LoggerService,
            NavbarSecurityPolicyService,
            CurrentUserService,
            JwtHelper,
            Constants
          ]
        });

        spyOn(LoggerService.prototype, 'info');
        spyOn(LoggerService.prototype, 'debug');

        currentUserService_isLoggedIn = spyOn(CurrentUserService.prototype, 'isLoggedIn');
      });

      it('should return empty list of "NavbarSecurityPolicy" enums when calling "getSecurityPolicies" but user is not logged in', inject([NavbarSecurityPolicyService], (service: NavbarSecurityPolicyService) => {
        let securityPolicies: Array<NavbarSecurityPolicy>
        currentUserService_isLoggedIn.and.returnValue(false);

        securityPolicies = service.getSecurityPolicies();
        expect(securityPolicies.length).toBe(0);
      }));
    });



    // TODO: could not figure out how to change privare propeties and its not possible to override them in an extended class 
    describe('user logged in but has no products ', () => {
      let jwtHelper_isTokenExpiredSpyOn: jasmine.Spy;
      let currentUserService_isLoggedIn: jasmine.Spy;
      let testUser: CurrentUser = new CurrentUser();

      class MockCurrentUserService extends CurrentUserService {
        public _currentUser: CurrentUser = testUser;
      }

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
          ],
          providers: [
            { provide: CurrentUserService, useClass: MockCurrentUserService },
            LoggerService,
            NavbarSecurityPolicyService,
            JwtHelper,
            Constants
          ]
        });

        spyOn(LoggerService.prototype, 'info');
        spyOn(LoggerService.prototype, 'debug');

        jwtHelper_isTokenExpiredSpyOn = spyOn(JwtHelper.prototype, 'isTokenExpired');
        currentUserService_isLoggedIn = spyOn(CurrentUserService.prototype, 'isLoggedIn');
      });

      it('should return empty list of "NavbarSecurityPolicy" enums when calling "getSecurityPolicies"', inject([NavbarSecurityPolicyService], (service: NavbarSecurityPolicyService) => {
        let securityPolicies: Array<NavbarSecurityPolicy>

        jwtHelper_isTokenExpiredSpyOn.and.returnValue(true);
        currentUserService_isLoggedIn.and.returnValue(true);

        securityPolicies = service.getSecurityPolicies();
        expect(securityPolicies.length).toBe(0);
      }));

    });

    describe('user logged in but has no viability product but has viability claims', () => {
      let jwtHelper_isTokenExpiredSpyOn: jasmine.Spy;
      let currentUserService_isLoggedIn: jasmine.Spy;
      let constantsInstance = new Constants();
      let testUser: CurrentUser = new CurrentUser();
      testUser.product = [constantsInstance.product.clarity];
      testUser.viabilityAccess = [constantsInstance.viabilityAccess.read];


      class MockCurrentUserService extends CurrentUserService {
        public _currentUser: CurrentUser = testUser;
      }

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
          ],
          providers: [
            { provide: CurrentUserService, useClass: MockCurrentUserService },
            LoggerService,
            NavbarSecurityPolicyService,
            JwtHelper,
            Constants
          ]
        });

        spyOn(LoggerService.prototype, 'info');
        spyOn(LoggerService.prototype, 'debug');

        jwtHelper_isTokenExpiredSpyOn = spyOn(JwtHelper.prototype, 'isTokenExpired');
        currentUserService_isLoggedIn = spyOn(CurrentUserService.prototype, 'isLoggedIn');
      });

      it('should return empty list of "NavbarSecurityPolicy" enums when calling "getSecurityPolicies"', inject([NavbarSecurityPolicyService], (service: NavbarSecurityPolicyService) => {
        let securityPolicies: Array<NavbarSecurityPolicy>

        jwtHelper_isTokenExpiredSpyOn.and.returnValue(true);
        currentUserService_isLoggedIn.and.returnValue(true);

        securityPolicies = service.getSecurityPolicies();
        expect(securityPolicies.length).toBe(0);
      }));


    });

    describe('user logged in but has viability product but has no viability claims', () => {
      let jwtHelper_isTokenExpiredSpyOn: jasmine.Spy;
      let currentUserService_isLoggedIn: jasmine.Spy;
      let constantsInstance = new Constants();
      let testUser: CurrentUser = new CurrentUser();
      testUser.product = [constantsInstance.product.viability];


      class MockCurrentUserService extends CurrentUserService {
        public _currentUser: CurrentUser = testUser;
      }

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
          ],
          providers: [
            { provide: CurrentUserService, useClass: MockCurrentUserService },
            LoggerService,
            NavbarSecurityPolicyService,
            JwtHelper,
            Constants
          ]
        });

        spyOn(LoggerService.prototype, 'info');
        spyOn(LoggerService.prototype, 'debug');

        jwtHelper_isTokenExpiredSpyOn = spyOn(JwtHelper.prototype, 'isTokenExpired');
        currentUserService_isLoggedIn = spyOn(CurrentUserService.prototype, 'isLoggedIn');
      });

      it('should return empty list of "NavbarSecurityPolicy" enums when calling "getSecurityPolicies"', inject([NavbarSecurityPolicyService], (service: NavbarSecurityPolicyService) => {
        let securityPolicies: Array<NavbarSecurityPolicy>

        jwtHelper_isTokenExpiredSpyOn.and.returnValue(true);
        currentUserService_isLoggedIn.and.returnValue(true);

        securityPolicies = service.getSecurityPolicies();
        expect(securityPolicies.length).toBe(0);
      }));

    });

    describe('user logged in and has viability product and has viability claims', () => {
      let jwtHelper_isTokenExpiredSpyOn: jasmine.Spy;
      let currentUserService_isLoggedIn: jasmine.Spy;
      let constantsInstance = new Constants();
      let testUser: CurrentUser = new CurrentUser();
      testUser.product = [constantsInstance.product.viability];
      testUser.viabilityAccess = [constantsInstance.viabilityAccess.read];

      class MockCurrentUserService extends CurrentUserService {
        public _currentUser: CurrentUser = testUser;
      }

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
          ],
          providers: [
            { provide: CurrentUserService, useClass: MockCurrentUserService },
            LoggerService,
            NavbarSecurityPolicyService,
            JwtHelper,
            Constants
          ]
        });

        spyOn(LoggerService.prototype, 'info');
        spyOn(LoggerService.prototype, 'debug');

        jwtHelper_isTokenExpiredSpyOn = spyOn(JwtHelper.prototype, 'isTokenExpired');
        currentUserService_isLoggedIn = spyOn(CurrentUserService.prototype, 'isLoggedIn');
      });

      it('should return a list of "NavbarSecurityPolicy" enums, one being "canUseViability" when calling "getSecurityPolicies"', inject([NavbarSecurityPolicyService], (service: NavbarSecurityPolicyService) => {
        let securityPolicies: Array<NavbarSecurityPolicy>

        jwtHelper_isTokenExpiredSpyOn.and.returnValue(true);
        currentUserService_isLoggedIn.and.returnValue(true);

        securityPolicies = service.getSecurityPolicies();
        expect(securityPolicies.length).toBeGreaterThan(0);

        expect(_.includes(securityPolicies, NavbarSecurityPolicy.canUseViability)).toBe(true);
      }));


    });



  });

});
