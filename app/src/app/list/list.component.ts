import { Component, OnInit } from '@angular/core';
import { IShoppingListItem } from '../_classes/shopping-list-item';
import { ShoppingListService } from '../_services/shopping-list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  shoppingList: IShoppingListItem[] = [];

  constructor(private _shoppinglistService: ShoppingListService) { }

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {
    this._shoppinglistService.getList().subscribe(
      res => {
        this.shoppingList = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  removeItem(id: string) {
    this._shoppinglistService.remove(id).subscribe(
      _res => {
        for (let i = 0; i < this.shoppingList.length; i++) {
          if (this.shoppingList[i]._id === id) {
            this.shoppingList.splice(i, 1);
            break;
          }
        }
      },
      err => {
        console.error(err);
      }
    );
  }

}
