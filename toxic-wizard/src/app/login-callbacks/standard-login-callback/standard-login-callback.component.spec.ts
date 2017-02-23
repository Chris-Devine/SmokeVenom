/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { JwtHelper } from 'angular2-jwt';

import { OidcClientService } from '../../core/authentication/oidc/oidc-client.service';
import { LoggerService } from '../../core/logger/logger.service'
import { CurrentUserService } from '../../core/current-user/current-user.service'
import { StandardLoginCallbackComponent } from './standard-login-callback.component';

describe('StandardLoginCallbackComponent', () => {
  let component: StandardLoginCallbackComponent;
  let fixture: ComponentFixture<StandardLoginCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        JwtHelper,
        OidcClientService,
        LoggerService,
        CurrentUserService
      ],
      declarations: [StandardLoginCallbackComponent]
    })
      .compileComponents();
    spyOn(LoggerService.prototype, 'info');
    spyOn(OidcClientService.prototype, 'callback')
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardLoginCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
