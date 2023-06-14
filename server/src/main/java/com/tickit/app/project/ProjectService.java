package com.tickit.app.project;

import com.tickit.app.repository.ProjectRepository;
import com.tickit.app.repository.StatusRepository;
import com.tickit.app.security.authentication.AuthenticationService;
import com.tickit.app.status.Status;
import com.tickit.app.status.StatusNotFoundException;
import com.tickit.app.ticket.Ticket;
import com.tickit.app.ticket.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.lang.NonNull;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service for managing {@link Project} entities
 */
@Service
public class ProjectService {
    private static final List<String> DEFAULT_STATUSES = List.of("Offen", "In Arbeit", "Erledigt");

    @NonNull
    private final ProjectRepository projectRepository;
    @NonNull
    private final StatusRepository statusRepository;
    @NonNull
    private final AuthenticationService authenticationService;
    @NonNull
    private final TicketService ticketService;

    @Autowired
    public ProjectService(
            @NonNull final ProjectRepository projectRepository,
            @NonNull final StatusRepository statusRepository,
            @NonNull final AuthenticationService authenticationService,
            @Lazy @NonNull TicketService ticketService) {
        this.projectRepository = projectRepository;
        this.authenticationService = authenticationService;
        this.statusRepository = statusRepository;
        this.ticketService = ticketService;
    }

    /**
     * Retrieves the project with the given id
     *
     * @param id of the project to be fetched
     * @return {@link Project}
     * @throws ProjectNotFoundException if no project with the given id was found
     */
    @NonNull
    public Project getProject(@NonNull final Long id) {
        return projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException(id));
    }

    /**
     * Initializes default statuses and saves the given project
     *
     * @param project to be created
     * @return saved project
     */
    @NonNull
    public Project createProject(@NonNull final Project project) {
        project.setOwner(authenticationService.getCurrentUser());
        final var savedProject = projectRepository.save(project);
        initializeDefaultStatuses(savedProject);
        return getProject(project.getId());
    }

    /**
     * Creates default statuses specified in {@link #DEFAULT_STATUSES} for the given project.
     *
     * @param savedProject project to create default statuses for
     */
    public void initializeDefaultStatuses(Project savedProject) {
        DEFAULT_STATUSES.forEach(statusName -> {
            final Status status = new Status();
            status.setName(statusName);
            status.setProject(savedProject);
            this.statusRepository.save(status);
        });
    }

    /**
     * Updates the given project
     *
     * @param project to be updated
     * @return saved project
     */
    @NonNull
    public Project updateProject(@NonNull final Project project) {
        final var dbProject = getProject(project.getId());
        dbProject.setName(project.getName());
        dbProject.setDescription(project.getDescription());
        return projectRepository.save(dbProject);
    }

    /**
     * Deletes the project with the given id
     *
     * @param id project id
     * @return {@code true} if deletion was successful
     */
    public boolean deleteProject(@NonNull final Long id) {
        checkProjectOwnership(id);
        projectRepository.deleteById(id);
        return true;
    }

    /**
     * Checks if the currently authenticated user is owner of the project.
     *
     * @param id project to be checked
     * @throws AccessDeniedException if project does not belong to the current user
     */
    private void checkProjectOwnership(Long id) {
        final var projectOwner = getProject(id).getOwner();
        if (authenticationService.getCurrentUser() == null || projectOwner.getId() != authenticationService.getCurrentUser().getId()) {
            throw new AccessDeniedException("User " + projectOwner.getId() + " is not owner of the project");
        }
    }

    public Map<String, List<Ticket>> getProjectTickets(Long id) {
        final Map<String, List<Ticket>> ticketMap = new HashMap<>();
        final Set<Ticket> tickets = getProject(id).getTickets();
        final Set<Status> statuses = getProject(id).getStatuses();
        statuses.forEach(status -> ticketMap.put(
                String.valueOf(status.getId()), tickets.stream().filter(ticket -> ticket.getStatus() == status).collect(Collectors.toList())));
        return ticketMap;
    }

    @NonNull
    public Ticket createTicketForProject(Long projectId, Ticket ticket) {
        final var statusId = ticket.getStatus().getId();
        if (statusId == 0L) {
            throw new IllegalArgumentException("Ticket status must be set");
        }
        ticket.setStatus(statusRepository.findById(statusId).orElseThrow(() -> new StatusNotFoundException(statusId)));
        ticket.setProject(getProject(projectId));
        return ticketService.createTicket(ticket);
    }
}
