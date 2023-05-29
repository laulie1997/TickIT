import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';

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
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }

  constructor(private projectService: ProjectService) {}
}
