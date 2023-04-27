import { Component } from '@angular/core';
import { MenuItem } from '../../projects/shared/src/lib/app.interfaces';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

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
    { text: 'View my Products', link: 'myProducts'},
    { text: 'Update a Product', link: 'not-implemented-yet' },
  ];
   
  isLoggedIn$ = this.service.isLoggedIn$;
  loggedInUserFullname$ = this.service.loggedInUserFullname$;
  
  loggedInUsername$ = this.service.loggedInUsername$;

  constructor(private service: AppService){};
  
  logout() {
    this.service.logout();
  }

}
