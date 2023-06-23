package com.tickit.app.ticket;

import com.tickit.app.project.ProjectUpdateEvent;
import com.tickit.app.repository.TicketRepository;
import com.tickit.app.status.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

@Service
public class TicketService {
    @NonNull
    private final TicketRepository ticketRepository;
    @NonNull
    private final StatusService statusService;
    @NonNull
    private final ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    public TicketService(
            @NonNull TicketRepository ticketRepository,
            @NonNull StatusService statusService,
            @NonNull ApplicationEventPublisher applicationEventPublisher) {
        this.ticketRepository = ticketRepository;
        this.statusService = statusService;
        this.applicationEventPublisher = applicationEventPublisher;
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
        final var savedTicket = ticketRepository.save(dbTicket);
        applicationEventPublisher.publishEvent(new ProjectUpdateEvent(savedTicket.getProject().getId()));
        return savedTicket;
    }

    public boolean deleteTicket(@NonNull final Long id) {
        final Long projectId = getTicket(id).getProject().getId();
        ticketRepository.deleteById(id);
        applicationEventPublisher.publishEvent(new ProjectUpdateEvent(projectId));
        return true;
    }
}
