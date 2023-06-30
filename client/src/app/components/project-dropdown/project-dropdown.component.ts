import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../api/project';
import { ProjectService } from '../../services/project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ProjectModalComponent,
  ProjectModification,
  ProjectModificationOperation,
} from '../project-modal/project-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Category } from '../../api/category';
import { CategoryService } from '../../services/category/category.service';
import { CategoriesModalComponent } from '../categories-modal/categories-modal.component';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-dropdown',
  templateUrl: './project-dropdown.component.html',
  styleUrls: ['./project-dropdown.component.css'],
})
export class ProjectDropdownComponent implements OnInit {
  projectId: number;
  projectIdSubscription: Subscription;
  @Input() category: Category;
  @Input() project: Project;
  form: UntypedFormGroup;

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
        this.getProjectName();
      }
    );
  }

  openEditProjectModal(projectId: number) {
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      height: '600px',
      width: '500px',
      data: { projectId: projectId },
    });

    dialogRef.afterClosed().subscribe((result: ProjectModification) => {
      if (result.operation === ProjectModificationOperation.EDITED) {
        this.getProjectName();
      } else if (result?.operation === ProjectModificationOperation.DELETED) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  getProjectName() {
    this.projectService.getProject(this.projectId).subscribe(project => {
      this.project = project;
    });
  }
}
