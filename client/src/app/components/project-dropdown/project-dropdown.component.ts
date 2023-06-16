import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Project } from '../../api/project';
import { ProjectService } from '../../services/project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-project-dropdown',
  templateUrl: './project-dropdown.component.html',
  styleUrls: ['./project-dropdown.component.css'],
})
export class ProjectDropdownComponent implements OnInit {
  project: Project;
  projectName: string;
  projectId: number;
  projectIdSubscription: Subscription;

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.projectIdSubscription = this.projectService.projectId$.subscribe(
      projectId => {
        this.projectId = projectId;
        console.log(projectId);
        this.getProjectName(projectId);
      }
    );
  }

  openEditProjectModal(projectId: number) {
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      height: '400px',
      width: '500px',
      data: { projectId: projectId },
    });
  }

  getProjectName(id: any) {
    this.projectService.getProject(this.projectId).subscribe(project => {
      this.project = project;
      this.projectName = project.name;
    });
  }
}
