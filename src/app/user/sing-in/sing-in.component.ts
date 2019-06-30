import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  isLoginError: boolean = false;
  constructor(
    private userService: UserService, 
    private router: Router, 
    private toastr: ToastrService) {
     }

  ngOnInit() {
  }

  OnSubmit(Username: string, Password: string) {
    this.userService.userAuthentication(Username, Password).subscribe(
      (data: any) => {
        localStorage.setItem("userToken", data.result);
        localStorage.setItem("UserId", data.userId);
        localStorage.setItem('userRoles', data.roles);
        this.router.navigate(["/profile"]);
      },
      (error: HttpErrorResponse) => {
        this.isLoginError = true;
        this.toastr.error(error.message);
      }
    )
  }
}
