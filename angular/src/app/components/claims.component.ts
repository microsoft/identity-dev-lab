import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})

export class ClaimsComponent {
    constructor(private auth: AuthService ) {

    }
    claims: any = this.auth.getClaims();
}
