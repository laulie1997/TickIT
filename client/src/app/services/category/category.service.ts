import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../api/project';
import { Category } from '../../api/category';
import { ProjectService } from '../project/project.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  project: Project;
  projectId: any;
  private baseURL: string = '/api/v1/project';
  constructor(
    private http: HttpClient,
    private projectService: ProjectService
  ) {}

  getCategories(projectId: any): Observable<Category[]> {
    return this.http.get<Category[]>(
      this.baseURL + '/' + projectId + '/category'
    );
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(
      this.baseURL + '/' + this.projectId + '/category/' + 'categoryID'
    );
  }

  createCategory(projectId: any, category: Category): Observable<Category> {
    return this.http.post<Category>(
      this.baseURL + '/' + projectId + '/category',
      category
    );
  }

  deleteCategory(category: Category): Observable<boolean> {
    return this.http.delete<boolean>(
      this.baseURL + '/' + this.projectId + '/category/' + category.id
    );
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(
      this.baseURL + '/' + this.projectId + '/category/' + category.id,
      category
    );
  }

  setProjectId() {
    this.projectId = this.projectService.getProject(this.project.id);
  }
}
