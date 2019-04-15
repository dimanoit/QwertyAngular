import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, fromEventPattern } from "rxjs";
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user/shared/user.service';

@Injectable()
export class HomeGuard implements CanActivate {

    constructor(private router: Router, private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        var token = localStorage.getItem("userToken");
        if (token == null) {
            this.router.navigate(['/login']);
        } else {
            let roles = route.data["roles"] as Array<string>;
            if (roles) {
                var match = this.userService.roleMatch(roles);
                if (match) return true;
                else {
                    this.router.navigate(['/login']);
                    return false;
                }
            }
            else {
                return true;
            }
        }
        return true;
    }
}