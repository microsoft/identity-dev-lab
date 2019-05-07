import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../components/app.component';
import { HomeComponent } from '../components/home.component';
import { ClaimsComponent } from '../components/claims.component';
import { AuthModule } from '../modules/auth.module';
import { AuthService } from '../services/auth.service';
import { ContactsComponent } from '../components/contacts.component';
import { FormsModule }   from '@angular/forms';
import { ContactService } from '../services/contact.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClaimsComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule
  ],
  providers: [AuthService,ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
