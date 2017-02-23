/* tslint:disable:no-unused-variable */

import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';

import { UserDropdownComponent } from './user-dropdown.component';
import { OidcClientService } from '../../core/authentication/oidc/oidc-client.service';
import { LoggerService } from '../../core/logger/logger.service'
import { CurrentUserService } from '../../core/current-user/current-user.service'
import { JwtHelper } from 'angular2-jwt';

describe('UserDropdownComponent', () => {
  let component: UserDropdownComponent;
  let fixture: ComponentFixture<UserDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        DropdownModule.forRoot(),
        TabsModule.forRoot(),
      ],
      providers: [
        JwtHelper,
        OidcClientService,
        LoggerService,
        CurrentUserService
      ],
      declarations: [UserDropdownComponent]
    })
      .compileComponents();

    spyOn(LoggerService.prototype, 'info');
    spyOn(LoggerService.prototype, 'debug');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when it calls "userLogout" it should make a call to the "OidcClientService" to "logout"', () => {
    spyOn(OidcClientService.prototype, 'logout');

    component.userLogout();

    expect(OidcClientService.prototype.logout).toHaveBeenCalled();
    expect(OidcClientService.prototype.logout).toHaveBeenCalledTimes(1);
  });
});
