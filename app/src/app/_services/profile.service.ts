import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../_classes/user-data';
import { environment } from '../../environments/environment';
import { resolve as urlResolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _http: HttpClient) { }

  get() {

    return this._http.get<UserData>(urlResolve(environment.apiUrl, 'profile'));

  }

}
