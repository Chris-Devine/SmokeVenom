/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { JwtHelper } from 'angular2-jwt';

import { LoggerService } from '../../core/logger/logger.service'
import { OidcClientService } from '../../core/authentication/oidc/oidc-client.service';
import { CurrentUserService } from '../../core/current-user/current-user.service'
import { SilentLoginCallbackComponent } from './silent-login-callback.component';

describe('SilentLoginCallbackComponent', () => {
  let component: SilentLoginCallbackComponent;
  let fixture: ComponentFixture<SilentLoginCallbackComponent>;

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
      declarations: [SilentLoginCallbackComponent]
    })
      .compileComponents();

    spyOn(LoggerService.prototype, 'info')
    spyOn(OidcClientService.prototype, 'silentcallback')
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SilentLoginCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
