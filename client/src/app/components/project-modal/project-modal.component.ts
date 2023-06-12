import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/api/project';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css'],
})
export class ProjectModalComponent implements OnInit {
  form: UntypedFormGroup;
  project: Project = {};
  editMode: boolean;
  dialogTitle = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { projectId: number },
    public dialogRef: MatDialogRef<ProjectModalComponent>,
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log(this.data.projectId);
    this.editMode = this.data.projectId != null;
    this.dialogTitle = this.editMode
      ? 'Projekt bearbeiten'
      : 'Projekt erstellen';
    if (this.editMode) {
      this.projectService
        .getProject(this.data.projectId)
        .subscribe((project: Project) => {
          this.project = project;
          console.log('fetched', this.project);
          this.buildForm();
        });
    }
    this.buildForm();

    console.log(this.project);
  }

  saveProject() {
    this.project.name = this.form.get('name').value;
    this.project.description = this.form.get('description').value;
    (this.editMode
      ? this.projectService.updateProject(this.project)
      : this.projectService.saveProject(this.project)
    ).subscribe(() => this.dialogRef.close(true));
  }

  deleteProject() {
    this.projectService.deleteProject(this.project).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [this.project.name || '', [Validators.required]],
      description: [this.project.description || ''],
    });
  }
}
