import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/tokenStorage/token-storage.service';
import { Project } from '../../api/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  project: Project;
  form: any = {
    name: null,
    description: null,
    owner: null,
  };
  errorMessage = '';
  ngOnInit(): void {}
  onSubmit() {
    this.project = this.form;
    this.projectService.saveProject(this.project).subscribe(
      async data => {
        this.projectService.getProject(data.id);
        this.router.navigate(['project/' + data.id]);
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }
  constructor(private projectService: ProjectService, private router: Router) {}
}
