import { Component, OnInit } from '@angular/core';
import { Profile } from '../ProfileService/profile.model';
import { ProfileService } from '../ProfileService/profile.service';
import { NgForm } from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {EventEmitter} from "@angular/core";
import {MaterializeAction} from 'angular2-materialize';
@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent implements OnInit {
  profile: Profile;
  modalActions = new EventEmitter<string|MaterializeAction>();
  constructor(private profileService: ProfileService, private toastr : ToastrService) {
    this.profile = new Profile();
    this.GetCurrentUser();
  }

  GetCurrentUser() {
    this.profileService.GetUserProfile().subscribe((data: any) => {
      this.profile.Name = data.Name;
      this.profile.Surname = data.Surname;
      this.profile.AboutUrl = data.AboutUrl;
      this.profile.Country = data.Country;
      this.profile.City = data.City;
      this.profile.Phone = data.Phone;
      this.profile.Email = data.Email;
      this.profile.UserId = data.Id;
      this.profile.UserName = data.UserName;
    });
  }

  OnSubmit(form: NgForm) {
    alert(form.value.Name);
    this.modalActions.emit({action:"modal",params:['close']});
    this.profileService.ChangeProfile(form.value).subscribe( (data : any) =>
    {
      if(data.Succedeed == true)
      {
        this.toastr.success("User changed",data.Succedeed);
      }
      else this.toastr.error(data.Message);
    },(error)=>{
      this.toastr.error(error[0]);
    });
  }

  ngOnInit() {

  }

}
