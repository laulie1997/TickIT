import { Injectable } from '@angular/core';
import { User } from 'src/app/api/user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  public getAuth(): string | null {
    return window.sessionStorage.getItem('user');
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem('user');
    window.sessionStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): User {
    const user = window.sessionStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  getCurrentUserId(): number {
    return this.getUser()?.id;
  }

  isLoggedIn() {
    return !!sessionStorage.getItem('user');
  }
}
