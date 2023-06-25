import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../api/project';
import { Category } from '../../api/category';
import { CategoryWrapper } from '../../api/categoryWrapper';
import { ProjectService } from '../project/project.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly baseURL: string = '/api/v1/category';

  constructor(private http: HttpClient) {}

  getCategory(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseURL}/${categoryId}`);
  }

  deleteCategory(categoryId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseURL}/${categoryId}`);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseURL}/${category.id}`, category);
  }
}
