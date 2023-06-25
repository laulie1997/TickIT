import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../api/category';
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
  @Input() category: Category;
  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchCategories(this.projectId);
  }

  fetchCategories(projectId: number) {
    this.projectService
      .getCategories(projectId)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        console.log(this.categories);
      });
  }

  openDialog(categoryId?: number) {
    const dialogRef = this.dialog.open(CategoriesModalComponent, {
      height: '480px',
      width: '500px',
      data: { categoryId: categoryId },
    });
    dialogRef.componentInstance.projectId = this.projectId;
    dialogRef.afterClosed().subscribe((successful: boolean) => {
      if (successful) {
        this.fetchCategories(this.projectId);
      }
    });
  }
}
