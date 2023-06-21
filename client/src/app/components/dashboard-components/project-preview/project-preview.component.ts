import { Component, Input } from '@angular/core';
import { Project } from '../../../api/project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.css'],
})
export class ProjectPreviewComponent {
  @Input() project: Project;

  constructor(private router: Router) {}

  openProjectDetails(projectId: number) {
    this.router.navigate(['project/' + projectId]);
  }
}
