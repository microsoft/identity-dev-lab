import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home.component';
import { ClaimsComponent } from '../components/claims.component';
import { ContactsComponent } from '../components/contacts.component';
import { MsalGuard } from "@azure/msal-angular";

const routes: Routes = [ 
  { path: '', component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'claims',  component: ClaimsComponent, canActivate : [MsalGuard] },
  { path: 'contacts',  component: ContactsComponent, canActivate : [MsalGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
