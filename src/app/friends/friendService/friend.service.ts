import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FriendModel } from './friend.model';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  readonly rootUrlToAccount = "http://localhost:52534/api/account/";
  readonly rootUrlToFriends = "http://localhost:52534/api/friends/";


  constructor(private http: HttpClient) {
  }

  GetUsers(friendModel: FriendModel) {
    var requestStrign = "?name=&surname=&country=&city=";
    if (friendModel != null) 
    {
      requestStrign = "?name=" + friendModel.name + "&surname=" + friendModel.surname + "&country=" + friendModel.country + "&city=" + friendModel.city;
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
