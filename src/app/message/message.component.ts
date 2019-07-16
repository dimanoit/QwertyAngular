import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Sms, Message } from 'src/app/message/sms/sms.model';
import { SmsService } from 'src/app/message/sms/sms.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { SignalRService } from './services/signal-r.service';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {

  ClassName: string;
  lastMessages: Sms[];
  DialogMessages: Message[];
  UserId: string;
  CurrentSenderId: string;
  baseImageUrl: string;

  constructor(
    private sanitizer: DomSanitizer,
    private signalRService: SignalRService,
    private SmsService: SmsService,
    private toastr: ToastrService) {
    this.UserId = localStorage.getItem("UserId");
    this.baseImageUrl = "assets/ProfileImages/";
    this.signalRService.startConnection();
    this.signalRService.addSendMessageListener();
    this.LastMessages();
  }

  sanitize(style) {
    return this.sanitizer.bypassSecurityTrustUrl(style);
  }

  setImageProfile(imageUrl: string) {

    if (imageUrl == null) {
      return "assets/ProfileImages/defaultProfileImage.png"
    }
    else {
      for (var i = imageUrl.length; ; i--) {
        if (imageUrl[i] == '/') {
          imageUrl = this.baseImageUrl + imageUrl.substr(i + 1, imageUrl.length - i);
          return imageUrl;
        }
      }
    }
  }

  LastMessages() {
    this.SmsService.GetLastMessages().toPromise().then(res => this.lastMessages = res as Sms[]);
  }

  GoToAreaMessages(SenderId: string) {

    if (SenderId != null) {
      this.SmsService.GetDialogMessages(SenderId).subscribe((res) => {
        if (res as Message[]) {
          this.DialogMessages = res as Message[];
          this.CurrentSenderId = SenderId
        }
      }, (error) => {
        this.toastr.error(error.error.message);
      });
    }
  }

  OnSubmit(form: NgForm) {
    var message = new Message();
    message.textMessage = form.value.Message;
    message.idRecipient = this.CurrentSenderId;
    message.idSender = this.UserId;
    this.SmsService.SendMessage(message).subscribe(
      (data: any) => {
        this.GoToAreaMessages(this.CurrentSenderId);
        this.LastMessages();
        this.toastr.success("Sent");
        form.reset();
      }, (error) => {
        this.toastr.error(error.error.message)
      });
  }

  ngOnInit() {

  }

  selectMessage(IdMessage: number) {
    //We use binary search, because the array of messages is ordered
    var middleId = 0;
    var indexLastElement = this.DialogMessages.length - 1;
    var indexFirstElement = 0;
    var count = 0;
    while (true) {
      middleId = Math.round((indexFirstElement + indexLastElement) / 2);

      if (IdMessage < this.DialogMessages[middleId].idMessage) {
        indexLastElement = middleId - 1;
      } else if (IdMessage > this.DialogMessages[middleId].idMessage) {
        indexFirstElement = middleId + 1;
      }
      else {
        this.DialogMessages[middleId].isSelected = !this.DialogMessages[middleId].isSelected;
        break;
      }

      if (indexFirstElement > indexLastElement)
      {
        alert("Non found");
        return;
      }
      count++;
    }
  }

  DeleteMessages(){
    for(var i = 0; i < this.DialogMessages.length; i++)
    {
      if(this.DialogMessages[i].isSelected == true)
      {
        this.SmsService.DeleteMessage(this.DialogMessages[i].idMessage).subscribe(
          (data: string) => 
          {
            this.toastr.success("Message has been deleted.");
          },
           (error:HttpErrorResponse) => 
          {
            this.toastr.error(error.message);
          });
      }
    }
    this.GoToAreaMessages(this.CurrentSenderId);
  }
  
}


