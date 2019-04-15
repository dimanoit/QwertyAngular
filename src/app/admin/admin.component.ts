import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminService } from './adminService/admin.service';
import { Profile } from '../profile/ProfileService/profile.model';
import { ProfileForAdmins } from './adminService/profileForAdmin.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  baseImageUrl: string;
  CurrentUsers: ProfileForAdmins[];

  constructor(private sanitizer: DomSanitizer,private adminService : AdminService,private toastr : ToastrService) {
  this.baseImageUrl = "assets/ProfileImages/";
  }

  GetUsers()
  {
    this.adminService.GetUsers().subscribe((data)=>{
      this.CurrentUsers = data as ProfileForAdmins[];
    });
  }

  ngOnInit() {
   this.GetUsers();
  }
  Block(UserId : string){
    this.adminService.BlockUser(UserId).subscribe((data: any) => {
      if (data.Succedeed == true) {
        this.toastr.success("Blocked");
        this.GetUsers();
      }
      else this.toastr.error(data.Message);
    }, (error) => {
      this.toastr.error(error.error.Message);
    })
  }

  Unblock(UserId : string){
    this.adminService.UnblockUser(UserId).subscribe((data: any) => {
      if (data.Succedeed == true) {
        this.toastr.success("Unblocked");
        this.GetUsers();
      }
      else this.toastr.error(data.Message);
    }, (error) => {
      this.toastr.error(error.error.Message);
    })
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
