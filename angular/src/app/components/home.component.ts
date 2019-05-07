import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  constructor(private auth: AuthService ) {
  }

  status = (this.auth.loggedIn) ? "Logged in" : "Not logged in"
}
