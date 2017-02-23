import { User } from 'oidc-client';
import { JwtHelper } from 'angular2-jwt';

import { DecodedAccessToken } from './decoded-access-token'
import { IdentityServerUserProfile } from './identity-server-user-profile'
import { LoggerService } from '../../logger/logger.service'

export class CurrentUser {

    public userName: string;
    public accessToken: string;
    public idToken: string;
    public role: Array<string>
    public product: Array<string>
    public viabilityAccess: Array<string>

    constructor(){
            this.clean();
        }
    
    clean(): void {
        this.userName = '';
        this.accessToken = '';
        this.idToken = '';
        this.role = new Array<string>();
        this.product = new Array<string>();
        this.viabilityAccess = new Array<string>();
    }
}
