import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TicketModalComponent } from '../ticket-modal/ticket-modal.component';
import { Ticket } from '../../api/ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent {
  ticket: Ticket;
  ticketId: number;
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TicketModalComponent, {
      width: '500px',
      data: { ticketId: this.ticketId },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ticket = result;
    });
  }
}
