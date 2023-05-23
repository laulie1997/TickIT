import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../api/user';
import { TokenStorageService } from '../tokenStorage/token-storage.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURLAuth = '/api/v1/security/authentication/';
  private baseURLUser = 'api/v1/security/';
  currentUser: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}
  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(
      this.baseURLAuth + 'login',
      {
        username,
        password,
      },
      httpOptions
    );
  }
  register(
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post(this.baseURLAuth + 'registration', {
      name,
      surname,
      username,
      email,
      password,
    });
  }
  updateUser(
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string
  ): Observable<any> {
    this.currentUser = this.tokenStorage.getUser();
    return this.http.put(this.baseURLUser + 'user/' + this.currentUser.id, {
      name,
      surname,
      username,
      email,
      password,
    });
  }
}
