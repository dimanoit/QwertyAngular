import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, fromEventPattern } from "rxjs";
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class HomeGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        var token = localStorage.getItem("userToken");
        if (token == null) {
            this.router.navigate(['/login']);
        }
        return true;
    }
}