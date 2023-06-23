import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
  RouterEvent,
} from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { TicketModalComponent } from '../ticket-modal/ticket-modal.component';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { StatusTicketDto } from 'src/app/api/statusTicketDto';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.css'],
})
export class ProjectBoardComponent implements OnInit, OnDestroy {
  projectId: number;
  project: Project;
  form: any = {
    name: null,
    description: null,
  };
  ticketStatusMap: StatusTicketDto[] = [];
  statuses: Status[] = [];
  connectedTo: string[] = [];
  socket: WebSocket;
  stompClient: Stomp.client;
  public destroyed = new Subject<any>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private ticketService: TicketService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initializeProjectBoard();
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.get('id')) {
        this.stompClient.unsubscribe();
        this.initializeProjectBoard();
      }
    });
  }

  ngOnDestroy(): void {
    this.stompClient.unsubscribe();
    this.destroyed.next(null);
    this.destroyed.complete();
  }

  initializeProjectBoard() {
    this.projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.projectService.emitProjectId(this.projectId);
    this.fetchProject();
    this.fetchProjectTickets();
    this.ticketStatusMap.forEach(dto => this.connectedTo.push(dto.status.name));

    const endpoint: string = '/topic/project/' + this.projectId;

    this.socket = new SockJS('http://localhost:8080/sba-websocket');
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe(endpoint, response =>
        this.fetchProjectTickets()
      );
    });
  }

  onTicketDropped(event: CdkDragDrop<Ticket[]>) {
    const statusId: number = +event.container.id;
    const ticketId = (event.item.data as Ticket)?.id;

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

    this.ticketService
      .updateTicketStatus(ticketId, statusId)
      .subscribe(() => this.fetchProjectTickets());
  }

  fetchProject(): void {
    this.projectService
      .getProject(this.projectId)
      .subscribe((response: Project) => (this.project = response));
  }

  fetchProjectTickets(): void {
    this.projectService
      .getProjectTickets(this.projectId)
      .subscribe((tickets: StatusTicketDto[]) => {
        this.ticketStatusMap = tickets;
      });
  }

  openStatusModal(statusId?: number) {
    const dialogRef = this.dialog.open(StatusModalComponent, {
      height: '480px',
      width: '500px',
      data: { projectId: this.projectId, statusId: statusId },
    });

    dialogRef.afterClosed().subscribe((successful: boolean) => {
      if (successful) {
        this.fetchProjectTickets();
      }
    });
  }

  openAddTicketDialog(statusId: number): void {
    const dialogRef = this.dialog.open(TicketModalComponent, {
      width: '500px',
      data: { ticketId: null, projectId: this.project.id, statusId: statusId },
    });

    dialogRef.afterClosed().subscribe(successful => {
      if (successful) {
        this.fetchProjectTickets();
      }
    });
  }
}
