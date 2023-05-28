package com.tickit.app.ticket;

import com.tickit.app.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;

    @Autowired
    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
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
        if (!ticketRepository.existsById(ticket.getId())) {
            throw new TicketNotFoundException(ticket.getId());
        }
        return ticketRepository.save(ticket);
    }

    public boolean deleteTicket(@NonNull final Long id) {
        ticketRepository.deleteById(id);
        return true;
    }
}
