import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Ticket } from '../../api/ticket';
import { TicketService } from '../../services/ticket/ticket.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project/project.service';
import { Project } from '../../api/project';
import { Subscription } from 'rxjs';
import { UserSelectionModalComponent } from '../user-selection-modal/user-selection-modal.component';
import { User } from '../../api/user';

@Component({
  selector: 'app-ticketdata',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.css'],
})
export class TicketModalComponent implements OnInit {
  @Input() projectId: number;
  @Input() project: Project;
  form: any = {
    title: null,
    description: null,
    dueDate: null,
  };
  ticket: Ticket = {};
  editMode: boolean;
  dialogTitle = '';

  constructor(
    public dialogRef: MatDialogRef<TicketModalComponent>,
    private ticketService: TicketService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { ticketId: number; projectId: number; statusId: number }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.editMode = this.data.ticketId != null;
    this.dialogTitle = this.editMode ? 'Ticket bearbeiten' : 'Ticket erstellen';
    this.buildForm();
    if (this.editMode) {
      this.ticketService
        .getSelectedTicket(this.data.ticketId)
        .subscribe((ticket: Ticket) => {
          this.ticket = ticket;
          this.updateForm();
        });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [this.ticket.title || '', [Validators.required]],
      description: [this.ticket.description || ''],
      dueDate: [this.ticket.dueDate || ''],
    });
  }

  deleteTicket() {
    this.ticketService
      .deleteTicket(this.ticket.id)
      .subscribe(() => this.dialogRef.close(false));
  }

  saveTicket() {
    this.ticket.title = this.form.get('name').value;
    this.ticket.description = this.form.get('description').value;
    this.ticket.dueDate = this.form.get('dueDate').value;
    if (!this.editMode) {
      this.ticket.project = { id: this.data.projectId };
      this.ticket.status = { id: this.data.statusId };
    }
    (this.editMode
      ? this.ticketService.updateTicket(this.ticket)
      : this.projectService.createTicketForProject(
          this.data.projectId,
          this.ticket
        )
    ).subscribe(() => this.dialogRef.close(true));
  }

  private updateForm(): void {
    this.form.get('name').setValue(this.ticket?.title);
    this.form.get('description').setValue(this.ticket?.description);
    this.form.get('dueDate').setValue(this.ticket?.dueDate);
  }
}
