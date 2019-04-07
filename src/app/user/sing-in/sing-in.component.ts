import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  isLoginError : boolean = false;
  constructor(private userService : UserService,private router : Router) { }

  ngOnInit() {
  }

  OnSubmit(Username : string,Password: string)
  {
    this.userService.userAuthentication(Username,Password).subscribe(
      (data : any) =>
      {
        localStorage.setItem("userToken",data.access_token);
        localStorage.setItem("UserId",data.Id);
        this.router.navigate(["/home"]);
      },
      (error : HttpErrorResponse) => 
      {
        this.isLoginError = true;
      }
    )
  }
}
