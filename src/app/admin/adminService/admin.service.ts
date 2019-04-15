import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  readonly rootUrlToAdmin = "http://localhost:61981/api/admin";
  GetUsers() {
    return this.http.get(this.rootUrlToAdmin,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken") }) });
  }
  BlockUser(IdUser: string) {
    return this.http.put(this.rootUrlToAdmin + "/block/" + IdUser,null,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken") }) });
  }
  UnblockUser(IdUser: string) {
    return this.http.put(this.rootUrlToAdmin+"/unblock/" +IdUser,null,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken") }) });
  }
}
