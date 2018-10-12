import { Component, AfterViewInit, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit, DoCheck {

  @ViewChild('sidebar') sidebar: ElementRef;
  @ViewChild('mdll') mdll: ElementRef;

  online = false;
  title = 'Shopper';

  constructor(public router: Router) {
    this.online = navigator.onLine;
  }

  ngAfterViewInit() {
    this.sidebar.nativeElement.addEventListener('click', () => {
      // routerLink does not act like a normal link, hence not closing the nav.
      this.mdll.nativeElement.MaterialLayout.toggleDrawer();
    });
  }

  ngDoCheck() {
    this.online = navigator.onLine;

    switch (this.router.url) {

      case '/':
        this.title = 'Shopping list';
        break;

      case '/add':
        this.title = 'Add an item';
        break;

      case '/scanner':
        this.title = 'Scanner';
        break;

      case '/profile':
        this.title = 'Your profile';
        break;

      case '/settings':
        this.title = 'Settings';
        break;

      default:
        this.title = 'Shopper';
        break;

    }

  }

}