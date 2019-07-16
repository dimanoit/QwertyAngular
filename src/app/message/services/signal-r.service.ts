import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Message } from '../sms/sms.model';
 
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
 
private hubConnection: signalR.HubConnection
private message: Message
 
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('http://localhost:52534/message')
                            .build();
 
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
 
  public addSendMessageListener = () => {
    this.hubConnection.on('sendMessage', (data) => {
      this.message = data;
      alert(data);
    });
  }
}