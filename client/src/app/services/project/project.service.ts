import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../api/project';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../tokenStorage/token-storage.service';
import { map } from 'rxjs/operators';
import { StatusWrapper } from 'src/app/api/statusWrapper';
import { Status } from 'src/app/api/status';
import { ProjectTicketWrapper } from 'src/app/api/projectTicketWrapper';
import { Ticket } from 'src/app/api/ticket';
import { ProjectWrapper } from 'src/app/api/projectWrapper';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseURL = '/api/v1/project';
  private baseURLUser = '/api/v1/security/user';
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}
  saveProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.baseURL, project);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(this.baseURL + '/' + id);
  }

  getAllProjects(): Observable<Project[]> {
    const userId = this.tokenStorage.getUser().id;
    return this.http
      .get<{ projects: Project[] }>(
        this.baseURLUser + '/' + userId + '/projects'
      )
      .pipe(map((wrapper: ProjectWrapper) => wrapper.projects));
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.baseURL + '/' + project.id, project);
  }

  deleteProject(project: Project): Observable<boolean> {
    return this.http.delete<boolean>(this.baseURL + '/' + project.id);
  }

  getProjectStatuses(projectId: number): Observable<Status[]> {
    return this.http
      .get<StatusWrapper>(this.baseURL + '/' + projectId + '/' + 'status')
      .pipe(map((wrapper: StatusWrapper) => wrapper?.statuses));
  }

  getProjectTickets(projectId: number): Observable<Map<string, Ticket[]>> {
    return this.http
      .get<ProjectTicketWrapper>(
        this.baseURL + '/' + projectId + '/' + 'ticket'
      )
      .pipe(map((wrapper: ProjectTicketWrapper) => wrapper?.statusTicketMap));
  }
}
