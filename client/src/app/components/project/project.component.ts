import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  form: any = {
    name: null,
    description: null,
  };
  errorMessage = '';
  ngOnInit(): void {}
  onSubmit() {
    const { name, description, owner } = this.form;
    this.projectService.saveProject(name, description, owner).subscribe(
      async data => {
        this.projectService.getSelectedProject(data.id);
        this.router.navigate(['project/' + data.id]);
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }

  constructor(private projectService: ProjectService, private router: Router) {}
}
