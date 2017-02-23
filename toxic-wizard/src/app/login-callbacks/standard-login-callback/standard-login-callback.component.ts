import { Component, OnInit } from '@angular/core';

import { OidcClientService } from '../../core/authentication/oidc/oidc-client.service';
@Component({
  selector: 'app-standard-login-callback',
  templateUrl: './standard-login-callback.component.html',
  styleUrls: ['./standard-login-callback.component.css']
})
export class StandardLoginCallbackComponent implements OnInit {

  constructor(private _oidcClientService: OidcClientService) { }

  ngOnInit() {
    this.oidcCallback();
  }

  private oidcCallback(): void {
    if (window.location.hash) {
      this._oidcClientService.callback();
    }
  }
}