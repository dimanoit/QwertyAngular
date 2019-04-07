import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LastSmsService {

  constructor(private http: HttpClient) { }

  readonly rootUrl = "http://localhost:61981/api/Messages/";

  GetLastMessages() {
    return this.http.get(this.rootUrl + "LastMessages",
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken") }) });
  }

}
