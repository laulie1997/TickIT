import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ticket } from '../../api/ticket';
import { TicketModalComponent } from '../ticket-modal/ticket-modal.component';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-ticketsmall',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css'],
})
export class TicketCardComponent {
  @Input() ticket: Ticket;

  constructor(public dialog: MatDialog, private ticketService: TicketService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TicketModalComponent, {
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
