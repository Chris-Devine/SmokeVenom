import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingOverlayModule } from './loading-overlay/loading-overlay.module'
import { HttpWrapperModule } from './authentication/http-wrapper/http-wrapper.module'
import { JwtHelper } from 'angular2-jwt';

import { Constants } from './constants/constants'
import { LoggerService } from './logger/logger.service'
import { ErrorHandlerReporterService } from './error-handler/error-handler-reporter.service'
import { OidcClientService } from './authentication/oidc/oidc-client.service'
import { CurrentUserService } from './current-user/current-user.service'

@NgModule({
  imports: [
    CommonModule,
    LoadingOverlayModule,
    HttpWrapperModule
  ],
  declarations: [],
  providers: [
    Constants,
    LoggerService,
    ErrorHandlerReporterService,
    OidcClientService,
    CurrentUserService,
    JwtHelper
  ],
  exports: [
    LoadingOverlayModule
  ]
})
export class CoreModule {
  // There should be only one instance of the services in core, in the entire application and only one provider of it.
}
