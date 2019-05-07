import { Injectable } from '@angular/core';
import { MsalService } from "@azure/msal-angular";

@Injectable()
export class AuthService { 
    loggedIn : boolean;
    public user: any = null;

    public isIframe: boolean;
    public AccessTokenKey = "access.token";

    constructor(public msal : MsalService)
    {
        //  This is to avoid reload during acquireTokenSilent() because of hidden iframe
        this.isIframe = window !== window.parent && !window.opener;
        this.user = this.msal.getUser();
        if(this.user) {
            this.loggedIn = true;
        }
        else {
            this.loggedIn = false;
        }
    }
    login() {
        this.msal.loginRedirect();
    }
    logout() {
        this.msal.logout();
    }
    getClaims(): any {
        return this.user.idToken;
    }
    isOnline(): boolean {
        return this.loggedIn;
    };
}
