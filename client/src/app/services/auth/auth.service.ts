import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../api/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'http://localhost:8080/api/v1/security/authentication/';
  constructor(private router: Router, private http: HttpClient) {}
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.baseURL + 'login', {
      username,
      password,
    });
  }

  register(
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post(this.baseURL + 'registration', {
      name,
      surname,
      username,
      email,
      password,
    });
  }
}
