import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ticket } from '../../api/ticket';
import { TicketdataComponent } from '../ticketdata/ticketdata.component';
import { Project } from '../../api/project';
import { TicketService } from '../../services/ticket/ticket.service';

@Component({
  selector: 'app-ticketsmall',
  templateUrl: './ticketsmall.component.html',
  styleUrls: ['./ticketsmall.component.css'],
})
export class TicketsmallComponent {
  ticket: Ticket;
  ticketId: number;
  constructor(public dialog: MatDialog, private ticketService: TicketService) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(TicketdataComponent, {
      width: '500px',
      data: { ticketId: this.ticketId },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ticket = result;
    });
  }

  readOne(event: Event, ticket: Ticket) {
    this.ticketService.getSelectedTicket(ticket.id).subscribe(response => {
      this.ticket = response;
      this.openDialog();
    });
  }
}
