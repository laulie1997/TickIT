import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'localhost:3306/api/v1/security/';
  constructor(private router: Router, private http: HttpClient) {}
  login(username: string, password: string): Observable<any> {
    return this.http.post(
      this.baseURL + 'login',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  isLoggedIn() {
    return !!sessionStorage.getItem('user');
  }
  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['']);
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
