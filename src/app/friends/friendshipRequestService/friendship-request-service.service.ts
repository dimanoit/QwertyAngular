import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FriendshipRequestStatus } from './friendshipRequest.model';

@Injectable({
  providedIn: 'root'
})
export class FriendshipRequestServiceService {
  readonly rootUrl = "http://localhost:61981/api/friendshipRequest/";

  constructor(private http: HttpClient) { 
  }
  GetRequests(userId : string){
    var requestStrign = "?userId="+userId;
    return this.http.get(this.rootUrl  + requestStrign,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken") }) });
  }

  SendRequests(requestModel : FriendshipRequestStatus){
    return this.http.post(this.rootUrl , requestModel,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken") }) });
  }

}
