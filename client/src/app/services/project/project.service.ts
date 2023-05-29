import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseURL = '/api/v1/project';

  constructor() { }
}
