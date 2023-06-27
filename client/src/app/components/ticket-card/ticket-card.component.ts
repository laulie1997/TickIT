import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ticket } from '../../api/ticket';
import { TicketModalComponent } from '../ticket-modal/ticket-modal.component';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { Project } from '../../api/project';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css'],
})
export class TicketCardComponent implements OnInit {
  @Input() ticket: Ticket;
  @Input() project: Project;
  @Input() projectId: number;
  constructor(public dialog: MatDialog, private ticketService: TicketService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TicketModalComponent, {
      width: '500px',
      data: {
        ticketId: this.ticket.id,
        projectId: this.projectId, // Pass the project ID to the modal
      },
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

  ngOnInit(): void {}
}
