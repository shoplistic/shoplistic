import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingListItem } from '../_classes/shopping-list-item';
import { ShoppingListService } from '../_services/shopping-list.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements AfterViewInit {

  @ViewChild('af') af: ElementRef;

  item = new ShoppingListItem('', '', '', 1);

  constructor(private _shoppinlistService: ShoppingListService) { }

  ngAfterViewInit() {
    this.af.nativeElement.focus();
  }

  onSubmit() {
    console.log(this.item);
    this._shoppinlistService.add(this.item).subscribe(
      res => {
        console.log('added');
      },
      err => {
        console.error(err);
      }
    );
  }

}
