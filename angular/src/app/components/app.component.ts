import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "../services/auth.service"; 
import { Subscription } from "rxjs/Subscription";
import { BroadcastService, MsalService } from "@azure/msal-angular";
import { aadOptions } from "../modules/auth.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'aadtest';

  private subscription: Subscription;

  constructor(private broadcastService: BroadcastService, public authService : AuthService) { }

  public ngOnInit() {
    //var msal = this.authService.msal;
    //this.broadcastService.subscribe("msal:loginFailure", (payload) => { });
    //this.broadcastService.subscribe("msal:loginSuccess", (payload) => { });
    //this.broadcastService.subscribe("msal:acquireTokenSuccess", (payload) => { });
    //this.broadcastService.subscribe("msal:acquireTokenFailure", (payload) => { });
  }
  public ngOnDestroy() {
      this.broadcastService.getMSALSubject().next(1);
      if(this.subscription) {
          this.subscription.unsubscribe();
      }
  }  
}
