import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ticket } from '../../api/ticket';
import { TicketService } from '../../services/ticket/ticket.service';
import { Project } from '../../api/project';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticketdata',
  templateUrl: './ticketdata.component.html',
  styleUrls: ['./ticketdata.component.css'],
})
export class TicketdataComponent implements OnInit {
  form: any = {
    title: null,
    description: null,
    dueDate: null,
  };
  ticket: Ticket = {};
  editMode: boolean;
  dialogTitle = '';
  constructor(
    public dialogRef: MatDialogRef<Ticket>,
    private ticketService: TicketService,
    private formBuilder: FormBuilder,
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
    });
  }

  deleteTicket() {}

  saveTicket() {
    this.ticket.title = this.form.get('name').value;
    this.ticket.description = this.form.get('description').value;
    if (!this.editMode) {
      this.ticket.project = { id: this.data.projectId };
      this.ticket.status = { id: this.data.statusId };
    }
    (this.editMode
      ? this.ticketService.updateTicket(this.ticket)
      : this.ticketService.saveTicket(this.ticket)
    ).subscribe(() => this.dialogRef.close(true));
  }

  private updateForm(): void {
    this.form.get('name').setValue(this.ticket?.title);
    if (this.ticket.description) {
      this.form.get('description').setValue(this.ticket?.description);
    }
  }
}
