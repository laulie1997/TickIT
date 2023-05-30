import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../api/user';
import { Project } from '../../api/project';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../tokenStorage/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseURL = '/api/v1/project';
  constructor(private http: HttpClient) {}
  saveProject(name: string, description: string): Observable<Project> {
    return this.http.post<Project>(this.baseURL, {
      name,
      description,
    });
  }

  //getProjects(): Observable<Project> {
  //  return this.http.get<Project>(this.baseURL);
  // }

  getSelectedProject(id: any): Observable<Project> {
    return this.http.get<Project>(this.baseURL + '/' + id);
  }
}
