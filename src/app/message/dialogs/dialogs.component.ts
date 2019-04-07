import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/user/shared/user.service';
import { LastSmsService } from './last-sms/last-sms.service';
import { lastSms } from './last-sms/last-sms.model';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit {
  items: lastSms[];
  UserId: string;
  baseImageUrl: string;
  constructor(private sanitizer: DomSanitizer,
    private lastSmsService: LastSmsService) {
    this.LastMessages();
    this.UserId = localStorage.getItem("UserId");
    this.baseImageUrl = "assets/ProfileImages/";
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
    this.lastSmsService.GetLastMessages().toPromise().then(res => this.items = res as lastSms[]);

  }

  ngOnInit() {
  }

}
