import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FriendModel } from './friendService/friend.model';
import { FriendService } from './friendService/friend.service';
import { NgForm } from '@angular/forms';
import { RequestProfile, FriendshipRequestStatus } from './friendshipRequestService/friendshipRequest.model';
import { FriendshipRequestServiceService } from './friendshipRequestService/friendship-request-service.service';
import { Profile } from '../profile/ProfileService/profile.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  CurrentUsers: Profile[];
  RequestsProfiles: RequestProfile[];
  Friends: Profile[];
  UserId: string;
  baseImageUrl: string;

  constructor(
    private sanitizer: DomSanitizer,
     private friendService: FriendService,
    private friendshipRequestServiceService: FriendshipRequestServiceService,
     private toastr: ToastrService) 
     {
    this.baseImageUrl = "assets/ProfileImages/";
     }

  ngOnInit() {
    this.friendService.GetUsers(null).subscribe((data) => {
      this.CurrentUsers = data as Profile[];
    });
    this.UserId = localStorage.getItem("UserId");
    this.GetFriends();
  }
  
  GetRequest() {
    this.friendshipRequestServiceService.GetRequests(localStorage.getItem("UserId"))
      .subscribe((data) => {
        this.RequestsProfiles = data as RequestProfile[];
      }, (error) => {
        this.toastr.error(error.error.Message);
      });
  }

  GetFriends() {
    this.friendService.GetFriends(localStorage.getItem("UserId")).subscribe((data) => {
      this.Friends = data as Profile[];
    })
  }

  SendRequset(RecipientUserId: string) {
    var friendRequestModel = new FriendshipRequestStatus();
    friendRequestModel.recipientUserId = RecipientUserId;
    friendRequestModel.senderUserId = this.UserId;
    this.friendshipRequestServiceService.SendRequests(friendRequestModel).subscribe((result: any) => {
      if (result.succedeed == true) {
        this.toastr.success("Sended", result.succedeed);
      }
      else this.toastr.error(result.message);
    }, (error) => {
      this.toastr.error(error.error.message);
    });

  }

  AcceptFriend(SenderId: string, RecipientId: string) {
    this.friendService.AddFriend(SenderId, RecipientId).subscribe((data: any) => {
      if (data.succedeed == true) {
        this.toastr.success("User accepted and message sent");
      }
      else this.toastr.error(data.message);
    }, (error) => {
      this.toastr.error(error.error.Message);
    });
  }
  OnSubmit(findUser: NgForm) {
    this.friendService.GetUsers(findUser.value).subscribe((data) => {
      this.CurrentUsers = data as Profile[];
    }, (error) => {
      this.toastr.error(error.error.Message);
    });
  }

  //#region SetImage
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
  //#endregion

}
