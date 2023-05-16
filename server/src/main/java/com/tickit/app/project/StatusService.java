package com.tickit.app.project;

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
    public Status createStatus(@NonNull final Long projectId, @NonNull final Status status) {
        final var project = projectService.getProject(projectId);
        status.setProject(project);
        return statusRepository.save(status);
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
        if (!statusRepository.existsById(status.getId())) {
            throw new RuntimeException("Status with id " + status.getId() + " does not exist");
        }
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
