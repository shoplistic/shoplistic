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
      manufacturer: 'Arla Foods',
      amount: 1
    },
    {
      id: '7310070001764',
      display_name: 'Ramlösa Smultron 50cl',
      manufacturer: 'Carlsberg Sweden AB',
      amount: 3
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
