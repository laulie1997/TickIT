import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { User } from '../../api/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl: string = '/api/v1/security/user';
  constructor(private httpClient: HttpClient) {}

  getUser(userId: number): Observable<User> {
    console.log(this.baseUrl + '/' + userId);
    return this.httpClient.get<User>(this.baseUrl + '/' + userId);
  }

  updateUser(user: User): Observable<User> {
    if (user.id == null) {
      return EMPTY;
    }
    return this.httpClient.put<User>(this.baseUrl + '/' + user.id, user);
  }
}
