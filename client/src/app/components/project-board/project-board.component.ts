import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../api/project';
import { Status } from 'src/app/api/status';
import { Ticket } from 'src/app/api/ticket';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { StatusModalComponent } from '../status-modal/status-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectModalComponent } from '../project-modal/project-modal.component';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.css'],
})
export class ProjectBoardComponent implements OnInit {
  projectId: number;
  project: Project;
  editProjectData = false;
  form: any = {
    name: null,
    description: null,
  };
  ticketStatusMap: Map<Status, Array<Ticket>> = new Map();
  statuses: Status[] = [];
  connectedTo: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.fetchProject();
    this.initializeStatusTicketMap();
    console.log(this.ticketStatusMap);
    this.ticketStatusMap.forEach((_, key) => this.connectedTo.push(key.name));
  }

  drop(event: CdkDragDrop<any>) {
    console.log('lol', event);
    console.log('dropped', event.previousContainer.id, event.container.id);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  dropped(event: any) {
    console.log('dropped', event);
    console.log('dropped', event.previousContainer, event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  fetchProject(): void {
    this.projectService
      .getProject(this.projectId)
      .subscribe((response: Project) => (this.project = response));
  }

  initializeStatusTicketMap(): void {
    this.ticketStatusMap.clear();
    this.projectService
      .getProjectStatuses(this.projectId)
      .subscribe((statuses: Status[]) => {
        this.statuses = statuses;
        this.fetchProjectTickets();
      });
  }

  fetchProjectTickets(): void {
    this.projectService
      .getProjectTickets(this.projectId)
      .subscribe((tickets: Map<string, Ticket[]>) => {
        Object.keys(tickets).forEach(key => {
          this.ticketStatusMap.set(this.findStatusById(key), tickets[key]);
        });
      });
  }

  private findStatusById(statusId: string): Status {
    return this.statuses.find(status => status?.id == Number(statusId));
  }

  openStatusModal(statusId?: number) {
    const dialogRef = this.dialog.open(StatusModalComponent, {
      height: '400px',
      width: '500px',
      data: { projectId: this.projectId, statusId: statusId },
    });

    dialogRef.afterClosed().subscribe((successful: boolean) => {
      if (successful) {
        this.initializeStatusTicketMap();
      }
    });
  }

  openEditProjectModal() {
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      height: '300px',
      width: '400px',
      data: { projectId: this.projectId },
    });

    dialogRef.afterClosed().subscribe((successful: boolean) => {
      if (successful) {
        this.fetchProject();
      }
    });
  }
}
