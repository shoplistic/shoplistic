import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { resolve as urlResolve } from 'url';
import { IShoppingListItem } from '../_classes/shopping-list-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor(private _http: HttpClient) { }

  getList() {

    return this._http.get<IShoppingListItem[]>(urlResolve(environment.apiUrl, 'shoppinglist'));

  }

  remove(id: string) {

    // Workaround to make angular send data with a delete request
    // https://stackoverflow.com/questions/38819336/body-of-http-delete-request-in-angular2
    return this._http.request('DELETE', urlResolve(environment.apiUrl, 'shoppinglist'), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { id: id }
    });

    // return this._http.delete(urlResolve(environment.apiUrl, 'shoppinglist'), item);

  }

}
