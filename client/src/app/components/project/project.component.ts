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
    const { name, description, ownerID } = this.form;
    this.projectService.saveProject(name, description).subscribe(
      data => {
        console.log(data + 'sucess');
        this.router.navigate(['project/:id']);
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }

  constructor(private projectService: ProjectService, private router: Router) {}
}
