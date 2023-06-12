import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../api/project';
import { User } from '../../api/user';
import { Status } from 'src/app/api/status';
import { Ticket } from 'src/app/api/ticket';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AddColumnModalComponent } from '../add-column-modal/add-column-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.css'],
})
export class ProjectBoardComponent implements OnInit {
  selectedID: number;
  project: Project;
  editProjectData = false;
  form: any = {
    name: null,
    description: null,
  };
  ticketStatusMap: Map<Status, Array<Ticket>> = new Map([
    [{ name: 'status1' }, [{ title: 'ticket1' }, { title: 'ticket2' }]],
    [{ name: 'status2' }, [{ title: 'ticket3' }, { title: 'ticket4' }]],
  ]);
  statuses: Status[] = [{ name: '2' }];
  connectedTo: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.selectedID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.selectedID);
    this.fetchProject(this.selectedID);
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

  fetchProject(id: number): void {
    this.projectService
      .getSelectedProject(id)
      .subscribe((response: Project) => (this.project = response));
  }

  updateProject() {
    this.projectService
      .updateProject(this.project)
      .subscribe((project: Project) => (this.project = project));
    this.editProjectData = false;
  }
  projectDataChange() {
    this.editProjectData = true;
  }
  cancel() {
    this.editProjectData = false;
  }

  deleteProject() {
    this.projectService
      .deleteProject(this.project)
      .subscribe((response: any) => {
        console.log('response: ', response);
      });
    alert('Projekt wurde gelöscht');
    this.router.navigate(['dashboard']);
  }

  openAddStatusModal() {
    const dialogRef = this.dialog.open(AddColumnModalComponent, {
      height: '300px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
    });
  }
}
