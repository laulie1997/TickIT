import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ticket } from '../../api/ticket';

@Component({
  selector: 'app-ticketdata',
  templateUrl: './ticketdata.component.html',
  styleUrls: ['./ticketdata.component.css'],
})
export class TicketdataComponent {
  constructor(
    public dialogRef: MatDialogRef<Ticket>,
    @Inject(MAT_DIALOG_DATA) public ticket: Ticket
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
