import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/api/project';
import { Ticket } from 'src/app/api/ticket';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';
import { UserService } from 'src/app/services/user/user.service';
import {
  ProjectModalComponent,
  ProjectModification,
  ProjectModificationOperation,
} from '../../project-modal/project-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  tickets: Ticket[] = [];
  projects: Project[] = [];
  private userId: number;

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenStorage.getCurrentUserId();
    this.fetchUserProjectsAndTickets();
  }

  fetchUserProjectsAndTickets() {
    this.userService
      .getUserTickets(this.userId)
      .subscribe((tickets: Ticket[]) => (this.tickets = tickets));
    this.userService
      .getUserProjects(this.userId)
      .subscribe((projects: Project[]) => (this.projects = projects));
  }

  openCreateProjectModal() {
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      height: '400px',
      width: '500px',
      data: { projectId: null },
    });

    dialogRef.afterClosed().subscribe((result: ProjectModification) => {
      if (
        result?.operation === ProjectModificationOperation.CREATED &&
        result?.projectId
      ) {
        this.router.navigate(['project/' + result.projectId]);
      }
    });
  }
}
