package com.tickit.app.ticket;

import com.tickit.app.repository.TicketRepository;
import com.tickit.app.status.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

@Service
public class TicketService {
    @NonNull
    private final TicketRepository ticketRepository;
    @NonNull
    private final StatusService statusService;

    @Autowired
    public TicketService(
            @NonNull TicketRepository ticketRepository,
            @NonNull StatusService statusService) {
        this.ticketRepository = ticketRepository;
        this.statusService = statusService;
    }

    /**
     * Retrieves the ticket with the given id
     *
     * @param id of the ticket to be fetched
     * @return {@link Ticket}
     * @throws TicketNotFoundException if no ticket with the given id was found
     */
    @NonNull
    public Ticket getTicket(@NonNull final Long id) {
        return ticketRepository.findById(id).orElseThrow(() -> new TicketNotFoundException(id));
    }

    public Ticket createTicket(@NonNull final Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    @NonNull
    public Ticket updateTicket(@NonNull final Ticket ticket) {
        final Ticket dbTicket = getTicket(ticket.getId());
        dbTicket.setDescription(ticket.getDescription());
        dbTicket.setTitle(ticket.getTitle());
        dbTicket.setStatus(ticket.getStatus());
        return ticketRepository.save(dbTicket);
    }

    @NonNull
    public Ticket updateTicketStatus(@NonNull final Long ticketId, @NonNull final Long statusId) {
        final Ticket dbTicket = getTicket(ticketId);
        dbTicket.setStatus(statusService.getStatus(statusId));
        return ticketRepository.save(dbTicket);
    }

    public boolean deleteTicket(@NonNull final Long id) {
        ticketRepository.deleteById(id);
        return true;
    }
}
