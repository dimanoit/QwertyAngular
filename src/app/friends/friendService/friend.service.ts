import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FriendModel } from './friend.model';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  readonly rootUrlToAccount = "http://localhost:61981/api/Account/";
  readonly rootUrlToFriends = "http://localhost:61981/api/Friends/";


  constructor(private http: HttpClient) {
  }

  GetUsers(friendModel: FriendModel) {
    var requestStrign = "?name=&surname=&country=&city=";
    if (friendModel != null) {
      requestStrign = "?name=" + friendModel.Name + "&surname=" + friendModel.Surname
        + "&country=" + friendModel.Country + "&city=" + friendModel.City;
    }
    return this.http.get(this.rootUrlToAccount + requestStrign,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken") }) });
  }

  GetFriends(userId: string) {
    var requestStrign = "?userId=" + userId;
    return this.http.get(this.rootUrlToFriends + requestStrign,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken") }) });
  }

  AddFriend(SenderId: string, RecipientId: string) {
    var requestStrign = SenderId + "/friend/" +  RecipientId;
    var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken") });
    return this.http.post(this.rootUrlToFriends+requestStrign,null,{headers: tokenHeader});
  }

}
