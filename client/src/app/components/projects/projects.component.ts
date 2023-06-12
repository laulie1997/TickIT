import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../api/project';
import { map } from 'rxjs/operators';
import { User } from '../../api/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  project: Project;
  selectedID: number;
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(response => {
      this.projects = Object.values(response);
      console.log(this.projects);
    });
  }

  readOne(event: Event, project: Project) {
    this.projectService.getProject(project.id).subscribe(response => {
      this.project = response;
      this.router.navigate(['project/' + project.id]);
    });
  }
}
