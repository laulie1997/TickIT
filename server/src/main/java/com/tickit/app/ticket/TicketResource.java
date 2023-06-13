package com.tickit.app.ticket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ticket")
public class TicketResource {
    @NonNull
    private final TicketService ticketService;

    @Autowired
    public TicketResource(@NonNull final TicketService ticketService) {
        this.ticketService = ticketService;
    }
    
    @GetMapping("{ticketId}")
    public Ticket getTicket(@PathVariable final Long ticketId) {
        return ticketService.getTicket(ticketId);
    }

    @PutMapping("{ticketId}")
    public Ticket updateTicket(@PathVariable final Long ticketId, @RequestBody final Ticket ticket) {
        ticket.setId(ticketId);
        return ticketService.updateTicket(ticket);
    }

    @DeleteMapping("{ticketId}")
    public boolean deleteTicket(@PathVariable final Long ticketId) {
        return ticketService.deleteTicket(ticketId);
    }
}
