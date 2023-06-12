import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ticket } from '../../api/ticket';
import { TicketdataComponent } from '../ticketdata/ticketdata.component';

@Component({
  selector: 'app-ticketsmall',
  templateUrl: './ticketsmall.component.html',
  styleUrls: ['./ticketsmall.component.css'],
})
export class TicketsmallComponent {
  ticket: Ticket;
  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(TicketdataComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ticket = result;
    });
  }
}
