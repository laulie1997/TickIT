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
    @Inject(MAT_DIALOG_DATA) public data: { ticketId: number }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data.ticketId);
    this.editMode = this.data.ticketId != null;
    this.dialogTitle = this.editMode ? 'Ticket bearbeiten' : 'Ticket erstellen';
    if (this.editMode) {
      this.ticketService
        .getSelectedTicket(this.data.ticketId)
        .subscribe((ticket: Ticket) => {
          this.ticket = ticket;
          console.log('fetched', this.ticket);
          this.buildForm();
        });
    }
    this.buildForm();

    console.log(this.ticket);
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
    (this.editMode
      ? this.ticketService.updateTicket(this.ticket)
      : this.ticketService.saveTicket(this.ticket)
    ).subscribe(() => this.dialogRef.close(true));
  }
}
