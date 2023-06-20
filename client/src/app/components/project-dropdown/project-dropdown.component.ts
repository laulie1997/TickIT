import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../api/project';
import { ProjectService } from '../../services/project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
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
  categories: Category[] = [];
  projectId: number;
  projectIdSubscription: Subscription;
  @Input() category: Category;
  @Input() project: Project;
  form: UntypedFormGroup;

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.projectIdSubscription = this.projectService.projectId$.subscribe(
      projectId => {
        this.projectId = projectId;
        console.log(projectId);
        this.getProjectName();
        this.fetchCategories(projectId);
      }
    );
  }

  openEditProjectModal(projectId: number) {
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      height: '400px',
      width: '500px',
      data: { projectId: projectId },
    });
    dialogRef.afterClosed().subscribe((successful: boolean) => {
      if (successful) {
        this.getProjectName();
      }
    });
  }

  getProjectName() {
    this.projectService.getProject(this.projectId).subscribe(project => {
      this.project = project;
    });
  }

  fetchCategories(projectId: any) {
    this.categoryService
      .getCategories(projectId)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        console.log(this.categories);
      });
  }

  openEditCategoryModal(): void {
    const dialogRef = this.dialog.open(CategoriesModalComponent, {
      width: '500px',
      data: {},
    });
  }
}
