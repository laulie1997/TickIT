import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router,) {
  }
    canActivate(){
    if (this.auth.isLoggedIn()){
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }

}
