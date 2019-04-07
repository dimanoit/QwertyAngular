import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import {ToastrService} from "ngx-toastr"
import { BrowserAnimationsModule} from "@angular/platform-browser/animations"
@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  user : User;
  constructor(private userService : UserService, private toastr : ToastrService) 
  {
    this.user = new User();
  }

  ngOnInit() {
  }

  resetForm(form? : NgForm)
  {
    if(form != null)
      {
      form.reset();
      this.user = new User();
      }
  }
  OnSubmit(form : NgForm)
  {
    this.userService.registerUser(form.value)
    .subscribe( (data : any) =>
    {
      if(data.Succedeed == true)
      {
        this.toastr.success("User registration successful",data.Succedeed);
        this.resetForm(form);
      }
      else this.toastr.error(data.Message);
    },(error)=>{
      this.toastr.error(error);
    });
  }
}
