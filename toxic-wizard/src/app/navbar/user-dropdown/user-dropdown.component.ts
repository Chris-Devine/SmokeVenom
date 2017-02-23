import { Component, OnInit } from '@angular/core';

import { OidcClientService } from '../../core/authentication/oidc/oidc-client.service';
@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css']
})
export class UserDropdownComponent implements OnInit {

  constructor(private _oidcClientService: OidcClientService) { }

  ngOnInit() {
  }

  userLogout():void{
    this._oidcClientService.logout();
  }
}
