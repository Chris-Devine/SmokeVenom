/* tslint:disable:no-unused-variable */

import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

import { Constants } from './core/constants/constants'
import { NavbarSecurityPolicyService } from './navbar/security-policy/navbar-security-policy.service'
import { LoggerService } from './core/logger/logger.service'
import { LoadingOverlayService } from './core/loading-overlay/services/loading-overlay.service'
import { OidcClientService } from './core/authentication/oidc/oidc-client.service';
import { CurrentUserService } from './core/current-user/current-user.service'

import { LoadingOverlayComponent } from './core/loading-overlay/loading-overlay.component'
import { NavbarComponent } from './navbar/navbar.component'
import { AppComponent } from './app.component';

@Component({
  selector: 'app-navbar',
  template: 'overide navbar'
})
class EmptyNavbarComponent { }

@Component({
  selector: 'app-loading-overlay',
  template: 'overide loading overlay'
})
class EmptyLoadingOverlayComponent { }


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        JwtHelper,
        LoggerService,
        LoadingOverlayService,
        OidcClientService,
        CurrentUserService,
        NavbarSecurityPolicyService,
        Constants
      ],
      declarations: [
        NavbarComponent,
        EmptyNavbarComponent,
        LoadingOverlayComponent,
        EmptyLoadingOverlayComponent,
        AppComponent
      ],
    })
      .overrideDirective(NavbarComponent, EmptyNavbarComponent)
      .overrideDirective(LoadingOverlayComponent, EmptyLoadingOverlayComponent)
      .compileComponents();
      
    spyOn(LoggerService.prototype, 'info')
    spyOn(LoggerService.prototype, 'debug')
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render empty component instead of navbar component, with text "overide navbar" inside', async(() => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-navbar').textContent).toContain('overide navbar');
  }));

  it('should render empty component instead of loading overlay component, with text "overide loading overlay" inside', async(() => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-loading-overlay').textContent).toContain('overide loading overlay');
  }));

});
