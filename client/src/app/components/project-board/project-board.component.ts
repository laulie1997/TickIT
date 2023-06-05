import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../api/project';
import { User } from '../../api/user';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.css'],
})
export class ProjectBoardComponent implements OnInit {
  selectedID: number;
  project: Project;
  editProjectData: boolean = false;
  form: any = {
    name: null,
    description: null,
  };
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
  onSubmit() {
    this.projectService
      .updateProject(this.project)
      .subscribe((project: Project) => (this.project = project));
    this.editProjectData = false;
  }
  projectDataChange() {
    this.editProjectData = true;
  }
  cancel() {
    this.editProjectData = false;
  }

  deleteProject() {
    this.projectService
      .deleteProject(this.project)
      .subscribe((project: Project) => (this.project = project));
    alert('Projekt wurde gelöscht');
    this.router.navigate(['dashboard']);
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) {}
}
