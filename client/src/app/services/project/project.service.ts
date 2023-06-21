import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Project } from '../../api/project';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../tokenStorage/token-storage.service';
import { map } from 'rxjs/operators';
import { StatusWrapper } from 'src/app/api/statusWrapper';
import { Status } from 'src/app/api/status';
import { ProjectTicketWrapper } from 'src/app/api/projectTicketWrapper';
import { Ticket } from 'src/app/api/ticket';
import { ProjectWrapper } from 'src/app/api/projectWrapper';
import { StatusTicketDto } from 'src/app/api/statusTicketDto';
import { UserWrapper } from 'src/app/api/userWrapper';
import { User } from 'src/app/api/user';
import { ProjectMembership } from 'src/app/api/projectMembership';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseURL = '/api/v1/project';
  private projectIdSubject = new Subject<number>();
  projectId$ = this.projectIdSubject.asObservable();

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

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.baseURL + '/' + project.id, project);
  }

  deleteProject(projectId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseURL + '/' + projectId);
  }

  getProjectStatuses(projectId: number): Observable<Status[]> {
    return this.http
      .get<StatusWrapper>(this.baseURL + '/' + projectId + '/' + 'status')
      .pipe(map((wrapper: StatusWrapper) => wrapper?.statuses));
  }

  getProjectTickets(projectId: number): Observable<StatusTicketDto[]> {
    return this.http
      .get<ProjectTicketWrapper>(
        this.baseURL + '/' + projectId + '/' + 'ticket'
      )
      .pipe(
        map((wrapper: ProjectTicketWrapper) => {
          return wrapper?.statusTicketMap;
        })
      );
  }

  createTicketForProject(
    projectId: number,
    ticket: Ticket
  ): Observable<Ticket> {
    return this.http.post<Ticket>(
      this.baseURL + '/' + projectId + '/' + 'ticket',
      ticket
    );
  }

  emitProjectId(projectId: number): void {
    this.projectIdSubject.next(projectId);
  }

  getProjectMembers(projectId: number): Observable<User[]> {
    return this.http
      .get<UserWrapper>(this.baseURL + '/' + projectId + '/users')
      .pipe(map((wrapper: UserWrapper) => wrapper.users));
  }

  updateProjectMembership(
    projectId: number,
    membership: ProjectMembership
  ): Observable<User[]> {
    return this.http
      .put<UserWrapper>(`${this.baseURL}/${projectId}/membership`, membership)
      .pipe(map((wrapper: UserWrapper) => wrapper.users));
  }
}
