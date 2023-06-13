import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Status } from 'src/app/api/status';
import { StatusService } from 'src/app/services/status/status.service';

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.css'],
})
export class StatusModalComponent implements OnInit {
  form: UntypedFormGroup;
  editMode: boolean;
  status: Status = {};
  icons: string[] = ['task_alt', 'emoji_objects', 'rocket', 'rotate_right'];
  readonly defaultColor = '#292929';
  readonly colorPalette: string[] = [
    '#ffa726',
    '#ec407a',
    '#7e57c2',
    '#3f51b5',
    '#c62828',
    '#03a9f4',
    '#26a69a',
    '#66bb6a',
    '#fbc02d',
    '#ff5722',
    '#795548',
    '#757575',
    '#607d8b',
    this.defaultColor,
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { projectId: number; statusId: number },
    public dialogRef: MatDialogRef<StatusModalComponent>,
    private statusService: StatusService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editMode = this.data.statusId != null;
    this.buildForm();
    if (this.editMode) {
      this.statusService
        .getStatus(this.data.statusId)
        .subscribe((status: Status) => {
          this.status = status;
          this.updateForm();
        });
    }
  }

  confirm() {
    this.status.name = this.form.get('name').value;
    this.status.color = this.form.get('color').value;
    this.status.icon = this.form.get('icon').value;
    if (!this.editMode) {
      this.status.project = { id: this.data.projectId };
    }
    (this.editMode
      ? this.statusService.updateStatus(this.status)
      : this.statusService.createStatus(this.status)
    ).subscribe(() => this.dialogRef.close(true));
  }

  deleteStatus() {
    this.statusService
      .deleteStatus(this.status.id)
      .subscribe(() => this.dialogRef.close(true));
  }

  private buildForm(): void {
    console.log(this.status);
    this.form = this.formBuilder.group({
      name: [this.status?.name || '', Validators.required],
      color: [this.status.color || this.defaultColor],
      icon: [this.status?.icon || '--'],
    });
    console.log(this.form);
  }

  private updateForm(): void {
    this.form.get('name').setValue(this.status?.name);
    if (this.status.color) {
      this.form.get('color').setValue(this.status.color);
    }
    if (this.status.icon) {
      this.form.get('icon').setValue(this.status.icon);
    }
  }
}
