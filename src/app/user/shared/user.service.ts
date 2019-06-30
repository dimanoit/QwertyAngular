import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { User } from './user.model';
import "rxjs"
import { LoginModel } from './loginModel.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = "http://localhost:52534/";

  constructor(private http: HttpClient) {

  }

  registerUser(user: User) {
    const body: User = {
      Username: user.Username,
      Name: user.Name,
      Password: user.Password,
      Surname: user.Surname
    };
    return this.http.post(this.rootUrl + "api/account/register", body);
  }

  userAuthentication(Username, Password) {
    let data = new LoginModel();
    data.password = Password;
    data.username = Username;
    return this.http.post(this.rootUrl + "api/authorization/token", data);
  }
  roleMatch(allowedRoles : string[]): boolean {
    var isMatch = false;
    var userRoles: string[] = localStorage.getItem('userRoles').split(','); // JSON.parse previouse
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
}
