import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../api/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = '/api/v1/security/authentication/';

  constructor(private router: Router, private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(
      this.baseURL + 'login',
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
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post(
      this.baseURL + 'registration',
      {
        name,
        surname,
        email,
        password,
      },
      httpOptions
    );
  }
}
