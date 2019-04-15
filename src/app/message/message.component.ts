import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Sms, Message } from 'src/app/message/sms/sms.model';
import { SmsService } from 'src/app/message/sms/sms.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {

  lastMessages: Sms[];
  DialogMessages: Message[];
  UserId: string;
  CurrentSenderId: string;
  baseImageUrl: string;

  constructor(private sanitizer: DomSanitizer,
    private SmsService: SmsService, private toastr: ToastrService) {
    this.UserId = localStorage.getItem("UserId");
    this.baseImageUrl = "assets/ProfileImages/";
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
        this.toastr.error(error.error.Message);
      });
    }
  }

  OnSubmit(form: NgForm) {
    var message = new Message();
    message.TextMessage = form.value.Message;
    message.IdRecipient = this.CurrentSenderId;
    message.IdSender = this.UserId;
    this.SmsService.SendMessage(message).subscribe(
      (data: any) => {
        this.GoToAreaMessages(this.CurrentSenderId);
        this.LastMessages();
        this.toastr.success("Sent");
        form.reset();
      }, (error) => {
        this.toastr.error(error.error.Message)
      });
  }

  ngOnInit() {
  }

}

