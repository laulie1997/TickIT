import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ticket } from '../../api/ticket';
import { TicketdataComponent } from '../ticketdata/ticketdata.component';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-ticketsmall',
  templateUrl: './ticketsmall.component.html',
  styleUrls: ['./ticketsmall.component.css'],
})
export class TicketsmallComponent {
  @Input() ticket: Ticket;

  constructor(public dialog: MatDialog, private ticketService: TicketService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TicketdataComponent, {
      width: '500px',
      data: { ticketId: this.ticket.id },
    });

    dialogRef.afterClosed().subscribe(successful => {
      if (successful) {
        this.fetchTicket();
      }
    });
  }

  fetchTicket() {
    this.ticketService
      .getSelectedTicket(this.ticket.id)
      .subscribe((ticket: Ticket) => (this.ticket = ticket));
  }
}
