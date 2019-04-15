import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './sms.model';
@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(private http: HttpClient) { }

  readonly rootUrl = "http://localhost:61981/api/messages/";

  GetLastMessages() {
    let request =this.rootUrl+localStorage.getItem("UserId") + "/dialogs";  
    return this.http.get(request,
      { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken") }) });
  }

  GetDialogMessages(SenderId: string) {
    if (SenderId != null) {
      return this.http.get(this.rootUrl+ localStorage.getItem("UserId") +
      "/messages/" + SenderId,
        { 
          headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken") })
        });
    }
  }

  SendMessage(message : Message){
    if(message != null){
      return this.http.post(this.rootUrl, message,
     { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("userToken") }) });
    }
  }

}
