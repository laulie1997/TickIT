import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Status } from '../../api/status';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  readonly baseURL: string = '/api/v1/status';

  constructor(private http: HttpClient) {}

  createStatus(status: Status): Observable<Status> {
    return this.http.post<Status>(this.baseURL, status);
  }

  deleteStatus(statusId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseURL + '/' + statusId);
  }

  getStatus(id: number): Observable<Status> {
    return this.http.get<Status>(this.baseURL + '/' + id);
  }

  updateStatus(status: Status): Observable<Status> {
    return this.http.put<Status>(this.baseURL + '/' + status.id, status);
  }
}
