import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { UserRegister } from '../_classes/user-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit {

  @ViewChild('af') af: ElementRef;

  submitted = false;
  registerData = new UserRegister('', '', '');
  error = '';
  ok = '';

  constructor(private _auth: AuthService, private _router: Router) {
    if (this._auth.loggedIn()) {
      this._router.navigate(['/']);
    }
  }

  ngAfterViewInit() {
    this.af.nativeElement.focus();
  }

  onSubmit() {

    this.submitted = true;
    this.error = '';

    this._auth.register(this.registerData)
      .subscribe(
        _res => {
          this.ok = 'Account created!';
        },
        err => {
          this.submitted = false;

          if (err.status === 409) {
            this.error = 'Username is already taken';
          } else {
            this.error = err.error.message ? err.error.message : err.message;
          }
        }
      );

  }

}
