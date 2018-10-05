import { Component, OnInit } from '@angular/core';

interface Article {
  id: string;
  display_name: string;
  manufacturer?: string;
  amount: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  shoppingList: Article[] = [
    {
      id: 'aaaa',
      display_name: 'Smör 500g',
      manufacturer: 'Arla',
      amount: 1
    },
    {
      id: 'aaaa',
      display_name: 'Smör 500g',
      manufacturer: 'Arla',
      amount: 1
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
