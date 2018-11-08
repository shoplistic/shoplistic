import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingListItem } from '../_classes/shopping-list-item';
import { ShoppingListService } from '../_services/shopping-list.service';
import { InfoBarService } from '../_services/info-bar.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements AfterViewInit {

  @ViewChild('af') af: ElementRef;

  item = new ShoppingListItem('', '', '', 1);

  constructor(private _shoppinlistService: ShoppingListService, private _infobarService: InfoBarService) { }

  ngAfterViewInit() {
    this.af.nativeElement.focus();
  }

  onSubmit() {
    this._shoppinlistService.add(this.item).subscribe(
      _res => {
        this._infobarService.show(`${this.item.display_name} added to the shopping list`, 3000);
        this.item = new ShoppingListItem('', '', '', 1);
      },
      err => {
        console.error(err);
      }
    );
  }

}
