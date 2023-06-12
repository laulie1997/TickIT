import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Status } from 'src/app/api/status';
import { StatusService } from 'src/app/services/status/status.service';

@Component({
  selector: 'app-add-column-modal',
  templateUrl: './add-column-modal.component.html',
  styleUrls: ['./add-column-modal.component.css'],
})
export class AddColumnModalComponent implements OnInit {
  form: UntypedFormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { projectId: number },
    public dialogRef: MatDialogRef<AddColumnModalComponent>,
    private statusService: StatusService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  confirm() {
    const statusName: string = this.form.get('name').value;
    const status: Status = {
      name: statusName,
      project: { id: this.data.projectId },
    };
    this.statusService
      .createStatus(status)
      .subscribe(() => this.dialogRef.close(true));
  }
}
