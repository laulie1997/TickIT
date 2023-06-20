import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/api/project';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent implements OnInit {
  form: UntypedFormGroup;
  @Input() projectId: number;
  @Input() editMode: boolean;
  @Output() actionFinished: EventEmitter<boolean> = new EventEmitter();

  project: Project = {};

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log(this.projectId);
    if (this.editMode) {
      this.projectService
        .getProject(this.projectId)
        .subscribe((project: Project) => {
          this.project = project;
          this.buildForm();
        });
    }
    this.buildForm();
  }

  saveProject() {
    this.project.name = this.form.get('name').value;
    this.project.description = this.form.get('description').value;
    (this.editMode
      ? this.projectService.updateProject(this.project)
      : this.projectService.saveProject(this.project)
    ).subscribe(() => {
      if (!this.editMode) {
        this.actionFinished.emit(true);
      }
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [this.project.name || '', [Validators.required]],
      description: [this.project.description || ''],
    });
  }
}
