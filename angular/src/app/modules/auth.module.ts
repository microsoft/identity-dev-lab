import { NgModule } from '@angular/core';
import { MsalInterceptor, MsalModule, MsalConfig } from "@azure/msal-angular";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpServiceHelper } from './HttpServiceHelper';

export function loggerCallback(logLevel, message, piiEnabled) {
    console.log(message);
}

export const protectedResourceMap:[string, string[]][]=
    [ 
        ['https://idlabapi.azurewebsites.net/contacts',  ['http://hackerdemo.com/idlabapi/user_impersonation']],
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
    ];

export const aadOptions: MsalConfig = {
    clientID:                  "ba1bbc39-6dfd-4abe-b9fc-c07f6c1fb41e",
    authority:                 "https://adfs3.thehacker.com/adfs/",
    validateAuthority:         true,
    redirectUri:               window.location.origin,
    cacheLocation:             "localStorage",
    postLogoutRedirectUri:     window.location.origin,
    consentScopes:             ["user.read"],
    navigateToLoginRequestUrl: true,
    logger:                    loggerCallback,
    popUp:                     false,
    protectedResourceMap:      protectedResourceMap
}

@NgModule({
  imports: [MsalModule.forRoot(aadOptions),HttpClientModule],
  exports: [MsalModule],
  providers: [
      HttpServiceHelper,
      {provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true}
    ]
})

export class AuthModule { }
