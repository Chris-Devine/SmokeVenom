import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { CurrentUserService } from '../../current-user/current-user.service'

export function authHttpServiceFactory(http: Http, options: RequestOptions, CurrentUserService: CurrentUserService) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
        tokenGetter: (() => CurrentUserService.currentUser.accessToken),
        globalHeaders: [{'Content-Type':'application/json'}],
        noJwtError: true
    }), http, options);
}

@NgModule({
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions, CurrentUserService]
    }
  ]
})
export class HttpWrapperModule { }
