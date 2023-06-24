import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../api/category';
import { CategoryService } from '../../services/category/category.service';
import { CategoriesModalComponent } from '../categories-modal/categories-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../../api/project';
import { ProjectService } from '../../services/project/project.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  project: Project;
  @Input() projectId: number;
  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectService
      .getProject(this.projectId)
      .subscribe((project: Project) => (this.project = project));
    console.log(this.projectId);
    this.fetchCategories(this.projectId);
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
    dialogRef.componentInstance.projectId = this.projectId;
  }
}
