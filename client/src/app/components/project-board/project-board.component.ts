import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../api/project';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.css'],
})
export class ProjectBoardComponent implements OnInit {
  selectedID: number;
  project: Project;
  projects: Project[];
  ngOnInit() {
    this.selectedID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.selectedID);
    this.readOne(this.selectedID);
  }

  readOne(id: number): void {
    this.projectService.getSelectedProject(id).subscribe(
      (response: Project) => (this.project = response),
      error => console.log(error)
    );
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {}
}
