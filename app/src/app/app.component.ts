import { Component, AfterViewInit, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { PwaService } from './_services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit, DoCheck {

  @ViewChild('sidebar') sidebar: ElementRef;
  @ViewChild('mdll') mdll: ElementRef;

  online = false;
  loggedIn = false;
  title = 'Shopper';

  constructor(public router: Router, public auth: AuthService, public pwa: PwaService) {

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
    this.loggedIn = this.router.url !== '/login' && this.router.url !== '/register';

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

      case '/about':
        this.title = 'About';
        break;

      default:
        this.title = 'Shopper';
        break;

    }

  }

  logOut() {
    this.auth.logOut();
    this.router.navigate(['/login']);
  }

  showInstallPrompt() {

    // @ts-ignore
    // this.pwa.prompt.prompt();
    this.pwa.showInstallPrompt();

  }

}
