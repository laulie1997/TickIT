import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../api/project';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.css'],
})
export class ProjectBoardComponent implements OnInit {
  id: string;
  project: Project;
  sub;
  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
      let projects = this.projectService.getSelectedProject(this.id);
      console.log(projects);
    });
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {}
}
