import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../api/user';
import { LoginCredentials } from '../../api/loginCredentials';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURLAuth = '/api/v1/security/authentication/';

  constructor(private router: Router, private http: HttpClient) {}
  login(loginCredentials: LoginCredentials): Observable<LoginCredentials> {
    console.log('Login!');
    return this.http.post<LoginCredentials>(
      this.baseURLAuth + 'login',
      loginCredentials
      // httpOptions
    );
  }
  register(user: User): Observable<User> {
    return this.http.post<User>(this.baseURLAuth + 'registration', user);
  }
}
