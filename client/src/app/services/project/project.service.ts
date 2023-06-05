import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../api/user';
import { Project } from '../../api/project';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseURL: string = '/api/v1/project';
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

  deleteProject(id: any): Observable<Project> {
    return this.http.delete<Project>(this.baseURL + '/' + id);
  }
}
