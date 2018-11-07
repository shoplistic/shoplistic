import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { resolve as urlResolve } from 'url';

interface IVersionResponse {
  version: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private _http: HttpClient) { }

  version: string | null = null;

  ngOnInit() {
    this._http.get<IVersionResponse>(urlResolve(environment.apiUrl, '/version')).subscribe(
      res => {
        this.version = res.version;
      },
      err => {
        this.version = 'Error fetching version';
      }
    );
  }

}
