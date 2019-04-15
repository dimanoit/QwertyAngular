import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { User } from './user.model';
import "rxjs"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = "http://localhost:61981/";

  constructor(private http: HttpClient) {

  }

  registerUser(user: User) {
    const body: User = {
      Username: user.Username,
      Name: user.Name,
      Password: user.Password,
      Surname: user.Surname
    };
    return this.http.post(this.rootUrl + "api/Account/Register", body);
  }

  userAuthentication(Username, Password) {
    var data = "grant_type=password&username=" + Username + "&password=" + Password;
    var reqHeader = new HttpHeaders({ 'Content-Type': "application/x-www-urlencoded" });
    return this.http.post(this.rootUrl + "Token", data, { headers: reqHeader });
  }
  roleMatch(allowedRoles : string[]): boolean {
    var isMatch = false;
    var userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;

  }
  
}
