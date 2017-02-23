/* tslint:disable:no-unused-variable */

import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';

import { NavbarSecurityPolicyService } from './security-policy/navbar-security-policy.service'
import { LoggerService } from '../core/logger/logger.service'
import { OidcClientService } from '../core/authentication/oidc/oidc-client.service';
import { CurrentUserService } from '../core/current-user/current-user.service'

import { Constants } from '../core/constants/constants'

import { UserDropdownComponent } from './user-dropdown/user-dropdown.component';
import { NavbarComponent } from './navbar.component';

@Component({
  selector: 'app-user-dropdown',
  template: 'overide user dropdown'
})
class EmptyUserDropdownComponent { }

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  describe('basics', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([]),
          DropdownModule.forRoot(),
          TabsModule.forRoot()
        ],
        providers: [
          JwtHelper,
          NavbarSecurityPolicyService,
          LoggerService,
          OidcClientService,
          CurrentUserService,
          Constants
        ],
        declarations: [
          UserDropdownComponent,
          EmptyUserDropdownComponent,
          NavbarComponent
        ]
      })
        .overrideDirective(UserDropdownComponent, EmptyUserDropdownComponent)
        .compileComponents();

      spyOn(LoggerService.prototype, 'info');
      spyOn(LoggerService.prototype, 'debug');
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NavbarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render empty component instead of user-dropdown component, with text "user dropdown" inside', async(() => {
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('app-user-dropdown').textContent).toContain('user dropdown');
    }));

    it('when it calls "redirectToLogin" it should make a call to the "OidcClientService" to "login"', () => {
      spyOn(OidcClientService.prototype, 'login');

      component.redirectToLogin();

      expect(OidcClientService.prototype.login).toHaveBeenCalled();
      expect(OidcClientService.prototype.login).toHaveBeenCalledTimes(1);
    });

  });

});
