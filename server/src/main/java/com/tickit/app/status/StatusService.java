package com.tickit.app.status;

import com.tickit.app.project.ProjectService;
import com.tickit.app.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

/**
 * Service for managing {@link Status} entity
 */
@Service
public class StatusService {
    @NonNull
    private final StatusRepository statusRepository;
    @NonNull
    private final ProjectService projectService;

    @Autowired
    public StatusService(
            @NonNull StatusRepository statusRepository,
            @NonNull ProjectService projectService) {
        this.statusRepository = statusRepository;
        this.projectService = projectService;
    }

    /**
     * Creates a new status for the given project
     *
     * @param status to be created
     * @return saved status
     */
    @NonNull
    public Status createStatus(@NonNull final Status status) {
        if (status.getProject() == null || status.getProject().getId() == 0L) {
            throw new IllegalArgumentException("Project id must be provided");
        }
        final var project = projectService.getProject(status.getProject().getId());
        status.setProject(project);
        return statusRepository.save(status);
    }

    @NonNull
    public Status getStatus(@NonNull final Long id) {
        return statusRepository.findById(id).orElseThrow(() -> new StatusNotFoundException(id));
    }

    /**
     * Updates the given status
     *
     * @param status to be updated
     * @return saved status
     * @throws RuntimeException if status does not exist
     */
    @NonNull
    public Status updateStatus(@NonNull final Status status) {
        final Status dbStatus = getStatus(status.getId());
        dbStatus.setName(status.getName());
        dbStatus.setIcon(status.getIcon());
        dbStatus.setColor(status.getColor());
        return statusRepository.save(status);
    }

    /**
     * Deletes the status with the given id
     *
     * @param id status id
     * @return {@code true} if deletion was successful
     */
    public boolean deleteStatus(@NonNull final Long id) {
        // TODO all tickets with the status will be deleted
        statusRepository.deleteById(id);
        return true;
    }
}
