import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, UserAPIUSerOne } from './user/user.interfaces';
import { Alert } from './alert/alert.interface';

const USER_API = 'http://localhost:3000/api/user'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();
  constructor(private http: HttpClient) {};

  login(username: string, password: string) {
    this.http.get<UserAPIUSerOne>(`${USER_API}/findOne/${username}`)
    .subscribe((user) => {this.loggedInSubject.next(user.data.password === password)});
  }

  alerts: Alert[] = [];

  newAlert(alert: Alert) {
    this.alerts.push(alert);
  }

  alertDismiss(index: number)  {
    this.alerts.splice(index, 1)
  }

}
