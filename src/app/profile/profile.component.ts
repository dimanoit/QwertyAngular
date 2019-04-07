import { Component, OnInit, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Profile } from './ProfileService/profile.model';
import { UserService } from '../user/shared/user.service';
import { ProfileService } from './ProfileService/profile.service';
import { ChangeProfileComponent } from './change-profile/change-profile.component';
import { MaterializeAction } from 'angular2-materialize';


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
  baseImageUrl : string; 

  constructor(private sanitizer: DomSanitizer, private profileService: ProfileService) {
    this.baseImageUrl = "assets/ProfileImages/";
    this.profile = new Profile();
    this.profileService.GetUserProfile().subscribe((data: any) => {
      this.profile.Name = data.Name;
      this.profile.Surname = data.Surname;
      this.profile.AboutUrl = data.AboutUrl;
      this.profile.Country = data.Country;
      this.profile.City = data.City;
      this.profile.Phone = data.Phone;
      this.profile.Email = data.Email;
      this.profile.UserId = data.Id;
      this.profile.ImageUrl = data.ImageUrl;
      for (var i = data.ImageUrl.length; ; i--) {
        if (data.ImageUrl[i] == '/') {
          this.imageUrl = this.baseImageUrl + data.ImageUrl.substr(i+1, data.ImageUrl.length - i);
          break;
        }
      }
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
        this.setImageProfile();
      });
    this.uploadPhotoModalActions.emit({ action: "modal", params: ['close'] });
  }

  ChangeUser() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }

  ngOnInit(): void {
  }
}
