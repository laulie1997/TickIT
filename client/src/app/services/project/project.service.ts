import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../api/user';
import { Project } from '../../api/project';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../tokenStorage/token-storage.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseURL: string = '/api/v1/project';
  private baseURLUser: string = '/api/v1/security/user';
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}
  saveProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.baseURL, project);
  }

  getSelectedProject(id: any): Observable<Project> {
    return this.http.get<Project>(this.baseURL + '/' + id);
  }

  getAllProjects(): Observable<Project[]> {
    const userId = this.tokenStorage.getUser().id;
    return this.http
      .get<{ projects: Project[] }>(
        this.baseURLUser + '/' + userId + '/projects'
      )
      .pipe(map(response => response.projects));
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.baseURL + '/' + project.id, project);
  }

  deleteProject(project: Project): Observable<Project> {
    return this.http.delete<Project>(this.baseURL + '/' + project.id);
  }
}
