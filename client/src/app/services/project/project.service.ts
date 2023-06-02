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
  saveProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.baseURL, project);
  }

  getSelectedProject(id: any): Observable<Project> {
    return this.http.get<Project>(this.baseURL + '/' + id);
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.baseURL + '/' + project.id, project);
  }
}
