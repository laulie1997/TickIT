import { Injectable } from '@angular/core';
import { EMPTY, Observable, map } from 'rxjs';
import { User } from '../../api/user';
import { HttpClient } from '@angular/common/http';
import { PasswordChangeRequest } from '../../api/passwordChangeRequest';
import { UserWrapper } from 'src/app/api/userWrapper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl: string = '/api/v1/security/user';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<UserWrapper>(this.baseUrl)
      .pipe(map((wrapper: UserWrapper) => wrapper.users));
  }

  getUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + '/' + userId);
  }

  updateUser(user: User): Observable<User> {
    if (user.id == null) {
      return EMPTY;
    }
    return this.httpClient.put<User>(this.baseUrl + '/' + user.id, user);
  }

  updatePassword(
    passwordChangeRequest: PasswordChangeRequest,
    userId: number
  ): Observable<PasswordChangeRequest> {
    return this.httpClient.post<PasswordChangeRequest>(
      this.baseUrl + '/' + userId + '/passwordChange',
      passwordChangeRequest
    );
  }
}
