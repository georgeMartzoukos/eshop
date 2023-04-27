import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, UserAPIUSerOne } from '../../projects/shared/src/lib/user.interfaces';
import { Alert } from '../../projects/ui/src/lib/alert/alert.interface';
import { Router } from '@angular/router';


const USER_API = 'http://localhost:3000/api/user'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();

  private loggedInUserFullnameSubject = new BehaviorSubject<string>('');
  loggedInUserFullname$ = this.loggedInUserFullnameSubject.asObservable();

  private loggedInUsername = new BehaviorSubject<string>('');
  loggedInUsername$ = this.loggedInUsername.asObservable();

  constructor(private http: HttpClient, private router: Router) {};

  login(username: string, password: string) {
    this.http.get<UserAPIUSerOne>(`${USER_API}/findOne/${username}`)
    .subscribe((user) => {this.loggedInSubject.next(user.data.password === password);

    this.loggedInUserFullnameSubject.next(
      `${user.data.name} ${user.data.surname}`
    );

    this.loggedInUsername.next(
      `${user.data.username}`
    )
    
    console.log(this.loggedInUsername.getValue() + this.loggedInUserFullnameSubject);
    });
   
  }

  logout() {
    this.loggedInSubject.next(false);
    this.loggedInUserFullnameSubject.next('');
    this.loggedInUsername.next('');
    
  }

  getLoggedInUserName() {
    return this.loggedInUsername.value;
  }

  alerts: Alert[] = [];

  newAlert(alert: Alert) {
    this.alerts.push(alert);
  }

  alertDismiss(index: number)  {
    this.alerts.splice(index, 1)
  }

}
