import { Component } from '@angular/core';
import { MenuItem } from './app.interfaces';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'E-Ehop';

  usersMenu: MenuItem[] = [
    { text: 'List all Users', link: 'user/list' },
    { text: 'Insert a User', link: 'user/insert' },
    { text: 'Delete a User', link: 'not-implemented-yet' },
    { text: 'Update a User', link: 'not-implemented-yet' },
  ];
  productsMenu: MenuItem[] = [
    { text: 'List all Products', link: 'product/list' },
    { text: 'Insert a Product', link: 'product/insert' },
    { text: 'Delete a Product', link: 'not-implemented-yet' },
    { text: 'Update a Product', link: 'not-implemented-yet' },
  ];

  isLoggedIn$ = this.service.isLoggedIn$;
  constructor(private service: AppService){};

}
