import { Component, OnInit, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Profile } from './ProfileService/profile.model';
import { UserService } from '../user/shared/user.service';
import { ProfileService } from './ProfileService/profile.service';
import { ChangeProfileComponent } from './change-profile/change-profile.component';
import { MaterializeAction } from 'angular2-materialize';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  profile: Profile;
  modalActions = new EventEmitter<string | MaterializeAction>();
  uploadPhotoModalActions = new EventEmitter<string | MaterializeAction>();
  fileToUpload: File;
  imageUrl: string;
  baseImageUrl: string;

  constructor(private sanitizer: DomSanitizer, private profileService: ProfileService,
    private toastr: ToastrService) {
    this.baseImageUrl = "assets/ProfileImages/";
    this.profile = new Profile();
    this.GetCurrentUser();
  }

  GetCurrentUser() {
    this.profileService.GetUserProfile().subscribe((data: any) => {
      this.profile = data as Profile;
      this.profile.ImageUrl = data.ImageUrl;
      for (var i = data.ImageUrl.length; ; i--) {
        if (data.ImageUrl[i] == '/') {
          this.imageUrl = this.baseImageUrl + data.ImageUrl.substr(i + 1, data.ImageUrl.length - i);
          break;
        }
      }
    },(error) =>{
      this.toastr.error(error.error.Message);
    });
  }

  sanitize(style) {
    return this.sanitizer.bypassSecurityTrustUrl(style);
  }

  setImageProfile() {
    if (this.imageUrl == null) {
      return "assets/ProfileImages/defaultProfileImage.png"
    }
    else return this.imageUrl;
  }

  UploadPhoto() {
    this.uploadPhotoModalActions.emit({ action: "modal", params: ['open'] });
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  OnSubmit(Image) {
    this.profileService.postFile(this.fileToUpload).subscribe(
      (data: any) => {
        if (data.Succeded == true) {
          this.toastr.success("Photo saved");
          this.setImageProfile();
        }
      }, (error) => {
        this.toastr.error(error.error.Message)
      });
    this.uploadPhotoModalActions.emit({ action: "modal", params: ['close'] });
  }

  ChangeUser() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }

  ngOnInit(): void {
  }
}
