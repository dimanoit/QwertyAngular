import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  CurrentUserRoles : string[];
  constructor(private router : Router,private userService : UserService) { }

  LogOut(){
    localStorage.removeItem("userToken");
    localStorage.removeItem("UserId");
    this.router.navigate(['/login']);
  }
  
  ngOnInit() {
    this.CurrentUserRoles =  JSON.parse(localStorage.getItem('userRoles'));
    if(this.CurrentUserRoles[0] == "blocked"){
    this.router.navigate(['/blocked']);
    }
  }

}
