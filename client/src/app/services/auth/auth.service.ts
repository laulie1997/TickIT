import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
    login(email: string, password: string){
      sessionStorage.setItem('user', 'user');
      this.router.navigate(['dashboard']);
      }
   isLoggedIn(){
    return !!sessionStorage.getItem('user');
  }
  logout(){
    sessionStorage.removeItem('user');
    this.router.navigate(['']);
  }
}
