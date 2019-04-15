import { Component, OnInit } from '@angular/core';
import { Profile } from '../ProfileService/profile.model';
import { ProfileService } from '../ProfileService/profile.service';
import { NgForm } from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {EventEmitter} from "@angular/core";
import {MaterializeAction} from 'angular2-materialize';
import { HttpErrorResponse } from '@angular/common/http';
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
      this.profile = data as Profile
    });
  }

  OnSubmit(form: NgForm) {
    this.profileService.ChangeProfile(form.value).subscribe( (data : any) =>
    {
      if(data.Succedeed == true)
      {
        this.toastr.success("User changed",data.Succedeed);
      }
      else this.toastr.error(data.Message);
    },(error: HttpErrorResponse) => {
      if (error.status === 400) {
        for (var key in error.error.ModelState)
          for (var i = 0; i < error.error.ModelState[key].length; i++)
            this.toastr.error(error.error.ModelState[key][i]);
      } else {
        this.toastr.error(error.error.Message);
      }
    });
    this.modalActions.emit({action:"modal",params:['close']});
    this.GetCurrentUser();

  }

  ngOnInit() {

  }

}
