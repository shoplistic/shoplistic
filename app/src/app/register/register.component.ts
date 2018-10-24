import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) {
    if (this._auth.loggedIn()) {
      this._router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

}
