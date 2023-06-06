package com.tickit.app.project;

import com.tickit.app.repository.ProjectRepository;
import com.tickit.app.security.authentication.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

/**
 * Service for managing {@link Project} entities
 */
@Service
public class ProjectService {
    @NonNull
    private final ProjectRepository projectRepository;
    @NonNull
    private final AuthenticationService authenticationService;

    @Autowired
    public ProjectService(
            @NonNull final ProjectRepository projectRepository,
            @NonNull AuthenticationService authenticationService) {
        this.projectRepository = projectRepository;
        this.authenticationService = authenticationService;
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
        // TODO initialize project with default statuses
        return projectRepository.save(project);
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
        if (projectOwner != authenticationService.getCurrentUser()) {
            throw new AccessDeniedException("User " + projectOwner.getId() + " is not owner of the project");
        }
    }
}
