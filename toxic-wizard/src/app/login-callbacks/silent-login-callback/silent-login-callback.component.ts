import { Component, OnInit } from '@angular/core';

import { OidcClientService } from '../../core/authentication/oidc/oidc-client.service';
@Component({
  selector: 'app-silent-login-callback',
  templateUrl: './silent-login-callback.component.html',
  styleUrls: ['./silent-login-callback.component.css']
})
export class SilentLoginCallbackComponent implements OnInit {

  constructor(private _oidcClientService: OidcClientService) { }

  ngOnInit() {
    this.oidcSilentCallback();
  }

  oidcSilentCallback(): void {
    if (window.location.hash) {
      this._oidcClientService.silentcallback();
    }
  }

}
