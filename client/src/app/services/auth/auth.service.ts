import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../api/user';
import { LoginCredentials } from '../../api/loginCredentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURLAuth = '/api/v1/security/authentication/';

  constructor(private http: HttpClient) {}

  login(loginCredentials: LoginCredentials): Observable<LoginCredentials> {
    return this.http.post<LoginCredentials>(
      this.baseURLAuth + 'login',
      loginCredentials
    );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.baseURLAuth + 'registration', user);
  }

  logout(): Observable<void> {
    window.sessionStorage.clear();
    return this.http.post<void>(this.baseURLAuth + 'logout', {});
  }
}
