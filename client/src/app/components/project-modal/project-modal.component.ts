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
  projectId: number;
  editMode: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { projectId: number },
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<ProjectModalComponent>
  ) {}

  ngOnInit(): void {
    this.editMode = this.data.projectId != null;
    this.projectId = this.data.projectId;
  }

  onActionFinished(event: ProjectModification) {
    this.dialogRef.close(event);
  }

  deleteProject() {
    this.projectService.deleteProject(this.projectId).subscribe(() =>
      this.dialogRef.close({
        operation: ProjectModificationOperation.DELETED,
        projectId: this.projectId,
      })
    );
  }
}

export enum ProjectModificationOperation {
  DELETED = 'DELETED',
  EDITED = 'EDITED',
  CREATED = 'CREATED',
}

export interface ProjectModification {
  operation: ProjectModificationOperation;
  projectId?: number;
}
