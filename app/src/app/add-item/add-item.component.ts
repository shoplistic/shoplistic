import { Component, OnInit } from '@angular/core';
import { ShoppingListItem } from '../_classes/shopping-list-item';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  item = new ShoppingListItem('', '', '', 1);

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.item);
  }

}
