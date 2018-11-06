import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../_services/profile.service';
import { UserData } from '../_classes/user-data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userData = new UserData('', 0);
  regDate = '';

  constructor(private _profileService: ProfileService) { }

  ngOnInit() {

    this._profileService.get().subscribe(
      res => {
        this.userData = res;
        this.regDate = new Date(res.registerDate).toLocaleString();
      },
      err => {
        console.error(err);
      }
    );

  }

}
