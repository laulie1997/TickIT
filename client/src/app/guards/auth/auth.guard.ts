import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { TokenStorageService } from '../../services/tokenStorage/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}
  canActivate() {
    if (this.tokenStorage.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['']);
    alert('Please login to access this page');
    return false;
  }
}
