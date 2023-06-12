import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ticket } from '../../api/ticket';
import { TicketService } from '../../services/ticket/ticket.service';

@Component({
  selector: 'app-ticketdata',
  templateUrl: './ticketdata.component.html',
  styleUrls: ['./ticketdata.component.css'],
})
export class TicketdataComponent {
  form: any = {
    title: null,
    description: null,
    dueDate: null,
  };
  errorMessage: '';
  constructor(
    public dialogRef: MatDialogRef<Ticket>,
    private ticketService: TicketService,
    @Inject(MAT_DIALOG_DATA) public ticket: Ticket
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  createTicket() {
    this.ticket = this.form;
    console.log(this.ticket);
    this.ticketService.createTicket(this.ticket).subscribe(
      data => {
        console.log(data);
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }
}
